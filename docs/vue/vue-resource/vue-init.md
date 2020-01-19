# vue初始化过程

通过vue入口文件的查找，我们知道vue的入口函数在/src/core/instance/index.js文件中。

在入口函数Vue中只做了一件事那就是执行了_init函数，从当前函数可以得知_init函数是定义在Vue原型上的，根据入口文件中的函数调用，我们猜测，_init是定义在initMixin(Vue)中，该_init方法在new Vue()和实力化组件时都会调用！

> initMixin方法位置/src/core/instance/init.js

该方法中只在Vue.protype上定义了一个_init方法。

## _init方法

在该方法中会判断当前实例是否是组件，如果是执行`initInternalComponent(vm,options)`方法初始组件，如果不是就合并默认选项与传入的选项，最终返回的都是组件的配置选项。

``` javascript
// 这里会给vm.$options赋值
if (options && options._isComponent) {
    initInternalComponent(vm, options)
} else {
  vm.$options = mergeOptions(
    resolveConstructorOptions(vm.constructor),
    options || {},
    vm
  )
}
```

然后就执行一系列的初始化函数，具体执行函数如下：

```javascript
initLifecycle(vm) // 初始化$refs、$children、$root、$parent以及vue内部使用的变量
initEvents(vm) // 将父组件中监听的事件添加到子组件中
initRender(vm) // 初始化$slots、$scopedSlots、$createElement，以及添加响应式属性$attrs、$listeners
callHook(vm, 'beforeCreate') // 执行beforeCreate钩子函数
initInjections(vm) // 初始化inject
initState(vm) // 初始化状态，props、methods、data、computed、watch
initProvide(vm) // 初始化provide
callHook(vm, 'created') // 执行created钩子
```

### initLifecycle方法

>方法存放的位置：/src/core/instance/lifecycle.js

`initLifecycle`方法中初始化了当前组件$refs、$children、$root、$parent，以及如果当前组件有父组件，那么将当前组件push到父组件的$children数组中。

``` javascript
initLifecycle (vm: Component) {
  const options = vm.$options
  let parent = options.parent
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent
    }
    parent.$children.push(vm) // 如果存在parent将当前组件push进父组件的$children中
  }

  // $refs、$children、$root、$parent初始化
  vm.$parent = parent
  vm.$root = parent ? parent.$root : vm

  vm.$children = []
  vm.$refs = {}
}
```

### 1.1.2、initEvents方法存放的位置：/src/core/instance/events.js

`initEvents`方法是跟事件相关的。

``` javascript
initEvents (vm: Component) {
  vm._events = Object.create(null) // vm._events表示的是父组件绑定在当前组件上的事件

  // _hasHookEvent它表示的是父组件有没有直接绑定钩子函数在当前组件上
  vm._hasHookEvent = false // 该属性表示父组件是否通过"@hook:"把钩子函数绑定在当前组件上

  // init parent attached events
  const listeners = vm.$options._parentListeners
  if (listeners) {
    // initEvents方法详解：https://www.imooc.com/article/30254
    updateComponentListeners(vm, listeners)
  }
}
```

### 1.1.3、initRender方法存放的位置：/src/core/instance/render.js

该方法中初始化了$slots、$scopedSlots用户能访问的属性以及$createElement方法、一些以下低杠_开头的内部属性，添加响应式式属性$attrs、$listeners

```javascript
export function initRender (vm: Component) {
  vm._vnode = null // 初始化当前组件的_vnode属性
  vm._staticTrees = null
  const options = vm.$options
  const parentVnode = vm.$vnode = options._parentVnode // 获取父组件的vnode
  const renderContext = parentVnode && parentVnode.context // 渲染上下文

  // 初始化当前组件的$slots，传入当前组件需要渲染的子组件，以及渲染上下文，返回一个对象
  vm.$slots = resolveSlots(options._renderChildren, renderContext)

  // 初始化当前组件的$scopedSlots属性，为一个空对象
  vm.$scopedSlots = emptyObject

  // 给vue调用的createElement函数
  vm._c = (a, b, c, d) => createElement(vm, a, b, c, d, false)
  
  // 给用户调用的createElement函数
  vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c, d, true)

  const parentData = parentVnode && parentVnode.data // 获取父节点的data

  /* istanbul ignore else */
  if (process.env.NODE_ENV !== 'production') {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, () => {
      !isUpdatingChildComponent && warn(`$attrs is readonly.`, vm)
    }, true)
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, () => {
      !isUpdatingChildComponent && warn(`$listeners is readonly.`, vm)
    }, true)
  } else {
    // 将$attrs、$listeners属性挂载到vm上并响应式
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true)
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, null, true)
  }
}
```

### 1.1.4、 initInjections方法存放的位置：src/core/instance/inject.js

该方法是inject的初始化函数

```javascript
export function initInjections (vm: Component) {
  // 返回一个对象，从当前组件的_provided属性中解析出父组件注入的依赖
  const result = resolveInject(vm.$options.inject, vm)
  if (result) {
    toggleObserving(false)
    Object.keys(result).forEach(key => {
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        defineReactive(vm, key, result[key], () => {
          warn(
            `Avoid mutating an injected value directly since the changes will be ` +
            `overwritten whenever the provided component re-renders. ` +
            `injection being mutated: "${key}"`,
            vm
          )
        })
      } else {
        // 将inject里面的key注册到vue实例上，并响应式化
        defineReactive(vm, key, result[key])
      }
    })
    toggleObserving(true)
  }
}

// resolveInject

export function resolveInject (inject: any, vm: Component): ?Object {
  if (inject) {
    const result = Object.create(null)
    // 获取inject的key数组，在支持symbol以及Reflect的环境下，采用Reflect.ownKeys(inject)获取
    const keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject)

    // 循环遍历keys
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      // #6574 in case the inject object is observed...
      if (key === '__ob__') continue
      /* 获取注入的key值，inject的value为obj时，设置了from字段，具体可查看官网 
        https://cn.vuejs.org/v2/api/#provide-inject
      */
      const provideKey = inject[key].from
      let source = vm
      while (source) {
        /* 由于组件初始化是从跟组件到子组件的，所以当跟组件和子组件同时存在_provided时，
           子组件在初始化inject时，这时候子组件的_provided属性还没挂载，因为provide初始化函数
           在inject初始化函数之后执行，所以source._provided在inject的初始化函数里是访问不到的
        */
        // 当前组件是否有_provided属性，并且provideKey是否是source._provided自身的属性
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey] // 获取注入key对应的value值
          break
        }
        source = source.$parent // 获取父组件，从父组件中得到_provided属性
      }
      // 如果不存在source，就说明父组件没有注入provide
      if (!source) {
        /* inject中key对应的value值是否有default属性，如果有，就取默认值，具体用法可查看官网
          https://cn.vuejs.org/v2/api/#provide-inject
        */
        if ('default' in inject[key]) {
          const provideDefault = inject[key].default // 获取默认值
          // 默认值如果是函数就执行函数获得返回值，并赋值给result[key]
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault
        } else if (process.env.NODE_ENV !== 'production') { // 不存在就报错
          warn(`Injection "${key}" not found`, vm)
        }
      }
    }
    return result
  }
}
```

### 1.1.5、initState方法的存放位置：src/core/instance/state.js

该方法是初始化状态的，包括props、methods、data、watch、computed，以及数据响应化

```javascript
export function initState (vm: Component) {
  vm._watchers = [] // 初始化当前实例的watcher存储器
  const opts = vm.$options
  if (opts.props) initProps(vm, opts.props) // 初始props
  if (opts.methods) initMethods(vm, opts.methods) // 初始methods
  if (opts.data) {
    initData(vm) // 初始data
  } else {
    observe(vm._data = {}, true /* asRootData */) // 如果不存在data，响应式一个空的data
  }
  if (opts.computed) initComputed(vm, opts.computed) // 初始computed
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch) // 初始watch
  }
}
```

### 1.1.6、initProvide方法的存放位置：src/core/instance/inject.js

该方法是provide选项的初始化

```javascript
export function initProvide (vm: Component) {
  const provide = vm.$options.provide // 获取provide选项
  if (provide) {
    // 将provide赋值给当前组件实例的_provided属性，该属性会在初始inject阶段用到，用于向上查找provide
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide
  }
}
```

### 编译与挂载$mount

在_init方法的最后，判断选项中是否有el，如果有el就自动执行编译、挂载行为，即调用$mount方法，至于该方法所做的事情，后面会写到。

至此，vue的初始化流程大致梳理完，其中代码细节可自行单独研究。
