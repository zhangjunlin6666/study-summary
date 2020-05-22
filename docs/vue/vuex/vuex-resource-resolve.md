<!--
 * @Author: jackson
 * @Date: 2019-10-22 11:33:21
 * @LastEditors  : jackson
 * @LastEditTime : 2020-01-05 23:37:44
 -->

# vuex源码解读

关于vuex的具体用法以及相关概念，可自行前往官网学习，当然在学习vuex前，需要掌握基本的js、html、css以及vue的用法，有实战经验更好，那样能更好的理解vuex的使用方式。

[vuex官网](https://vuex.vuejs.org/zh/)

![vuex](/img/vuex.png)

## 源码解读

关于源码解读步骤跟vue-router方法一致，并且vuex的入口配置以及打包的rollup配置与vue-router也差不多，在此也不再赘述，有兴趣的可自行翻阅源码学习。

对于vuex源码首先我们还是需要找到入口文件，vuex的入口文件路径为根目录下的/src/index.js，入口文件中导入了Store构造函数、install函数以及几个辅助方法。同时也将这些函数和方法通过export default暴露出去。

### 分析store中的install函数做了什么

从index.js中得知，install是从store.js中导入的，在install函数中会接收传入的vue构造函数用于对vue的扩展，这个vue参数是在调用vue.use时传入的，然后调用了applyMixin(Vue)方法，该方法在src下的mixin.js中，applyMixin首先获取vue的版本号，针对vue1.0和2.0分别做不同处理，如果是2.0就使用vue.mixin在this上挂载$store属性，如果是1.0就会在vue的初始化函数_init上进行扩展从而挂载$store属性，对于$store的挂载，不同于vue-router直接在vue.prototype上挂载$router以及$route，vuex是在根实例的this上挂载$store，然后在子组件中会去判断是否存在父组件以及父组件是否有$store属性，如果条件满足，就给当前子组件实例挂载$store,并将父组件的$store赋值给子组件的$store。

![install](/img/vuex-install.png)

![applyMixin](/img/install-mixin.png)

### 分析store中的Store类做了什么

在Store的构造器中：

1、首先会判断vuex脚本是否是通过script引入的，如果是会自动调用install方法进行$store属性的挂载！

```javascript
if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}
```

2、检测是否调用vue.use(vuex)进行插件注册，浏览器是否支持promise，不支持需要安装Promise polyfill垫片

```javascript
if (process.env.NODE_ENV !== 'production') {
    assert(Vue, `must call Vue.use(Vuex) before creating a store instance.`)
    assert(typeof Promise !== 'undefined', `vuex requires a Promise polyfill in this browser.`)
    assert(this instanceof Store, `store must be called with the new operator.`)
}
```

3、内部变量的初始化，其中_modules属性是用来初始化模块的，通过ModuleCollection类构造一个模块对象，dispatch以及commit中this的绑定

***

ModuleCollection类是从src/module/module-collection.js中导出的，在实例化ModuleCollection时，调用register方法，该方法首先会对vuex的配置对象进行校验，比喻mutations、getters中对应的value应该为函数类型，actions为函数或者带有handler属性的对象类型。然后将传入的options配置传递给Module类实例化一个模块对象，如果该实例没有子模块，就将该模块赋值给this.root，否则通过get方法获取当前模块的父模块，并已当前模块名为key，模块为value，挂载到父模块的_children属性中，最后递归调用register方法，重复以上操作。该类中的get方法是返回对应模块路径下的模块，getNamespace方法会根据模块是否设置namespaced动态返回命名空间路径，unregister、update一个是卸载模块一个是更新模块，卸载模块其实是删除_children集合中对应的模块。

***

Module类是从src/module/module.js中导出的，该类主要实现了模块的添加、删除、设置以及更新，然后实现了几个辅助方法，例如遍历存放子模块的容器_children、getters、mutations、actions

***

4、调用installModule方法进行模块的注册，resetStoreVM方法是将state转换成响应式，然后循环遍历plugins选项，执行插件数组中所有的方法

5、最后Store中实现了vuex实例上的各个方法以及属性，比喻state、getters、dispatch、commit、replacestate、watch等等，具体细节可自行阅读源码

6、最后看看src/helpers.js，该文件实现了vuex的几个辅助函数，mapstate、mapActions、mapMutations、mapGetters、createNamespacedHelpers，关于这几个辅助函数的用法可自行前往官网学习。

vuex简易代码实现：

```javascript

/*
1.支持vue.use
2.实现4个东西：state/mutations/actions/getters
3.数据响应式，利用vue的响应式系统，强依赖vue
4.创建stroe类
*/
let Vue;
class Stroe {
    constructor (options = {}) {
        this.name = 'debug';
        // state需要Vue做响应式，所以vuex只适合与vue结合使用
        this.state = new Vue({
            data: options.state
        });
        // mutations 存储
        // commit执行mutations
        this.mutations = options.mutations || {};

        // actions 存储actions
        this.actions = options.actions;

        // getters 自己实现的
        // let getters = options.getters || {};
        // this.getters = {};
        // for (let i in getters) {
        //     this.getters[i] = getters[i](this.state);
        // }

        // 视频实现的
        options.getters && this.handleGetters(options.getters);
    }

    commit = (type, arg) => {
        if (!this.mutations[type]) {
            return false;
        }
        this.mutations[type](this.state, arg);
    }

    dispatch = (type, arg) => {
        if (!this.actions[type]) {
            return false;
        }
        this.actions[type]({
            state: this.state,
            commit: this.commit
        }, arg);
    }

    handleGetters (getters) {
        this.getters = {};
        Object.keys(getters).forEach(key => {
            // 为this.getters定义若干属性，这些属性是只读的，通过Object.defineProperty的访问器属性get实现
            Object.defineProperty(this.getters, key, {
                get: () => {
                    return getters[key](this.state);
                }
            });
        });
    }
}

function install (_Vue) {
    Vue = _Vue;
    // 由于Vue通过use挂载插件时，Vue还没初始化，因此这时拿不到this
    Vue.mixin({
        beforeCreate () {
            if (this.$options.Kstore) {
                Vue.prototype.$kstore = this.$options.Kstore;
            }
        }
    });
}

export default {
    Stroe,
    install
};

```
