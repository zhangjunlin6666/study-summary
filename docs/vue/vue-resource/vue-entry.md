<!--
 * @Author: jackson
 * @Date: 2020-01-02 16:57:08
 * @LastEditors  : jackson
 * @LastEditTime : 2020-01-18 16:53:02
 -->

# vue入口

[vue源码解读好文推荐]( https://nlrx-wjc.github.io/Learn-Vue-Source-Code/)

所谓入口，就是vue开始的地方，那么首先就需要找到定义Vue构造函数的文件，从入口开始一步一步分析源码。

首先从package.json入手，查看script字段中的属性，通过build可找到vue的打包入口文件scripts/build.js，在build.js中，通过config.js中的getAllBuilds方法获取所有的vue打包配置，从而输出最终的打包文件！

在config.js中找到builds中的web-full-dev，我们看到它的入口文件为entry-runtime-with-compiler.js，即打包后的vue是带编译器的。下面从这个文件开始查找vue入口。

## entry-runtime-with-compiler.js位置

> /src/platforms/web/entry-runtime-with-compiler.js

在该文件中，我们看到 import Vue from './runtime/index'，打开./runtime/index文件

## runtime/index位置

> /src/platforms/web/runtime/index.js

在该文件中，我们看到 import Vue from 'core/index'，打开core/index文件

## core/index位置

> /src/core/config.js

在该文件中，我们看到 import Vue from './instance/index', 打开./instance/index文件

## instance/index位置

> /src/core/instance/index.js

```javascript
import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

initMixin(Vue) // 该方法是在vue的原型上定义_init方法
stateMixin(Vue) // 该方法在vue的原型上定义了$data、$props属性，以及$el、$delete、$watch方法
eventsMixin(Vue) // 该方法在vue原型上定义了事件相关的方法，$on\$once\$event\$off
lifecycleMixin(Vue) // 该方法在vue原型上定义了_update、$forceUpdate、$destroy方法
renderMixin(Vue) // 该方法在vue原型上定义了$nextTick、_render方法

export default Vue
```

到此我们就找到了vue构造函数定义的文件，接下来就从该文件开始分析源码。
