# rem

[移动端rem布局的通俗易懂](https://www.jianshu.com/p/64e5834cc81d)

[rem换算](https://www.jianshu.com/p/d9606faafbaf)

[rem布局原理深度理解（以及em/vw/vh）](https://www.cnblogs.com/leaf930814/p/9059340.html)

# 自行实现动态计算rem

``` javascript
// 设置 rem 函数
function setRem () {

  // 320 默认大小16px; 320px = 20rem ;每个元素px基础上/16
  let htmlWidth = document.documentElement.clientWidth ||
                  document.body.clientWidth;
  //得到html的Dom元素
  let htmlDom = document.getElementsByTagName("html")[0];
  //设置根元素字体大小
  htmlDom.style.fontSize= htmlWidth/10 + "px";
}
// 初始化
setRem();
// 改变窗口大小时重新设置 rem
window.onresize = function () {
  setRem();
}
```

```javascript
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ?
                    'orientationchange' :
                    'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if(clientWidth>=750){
                docEl.style.fontSize = '100px';
            }else{
                docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
            }
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
```

# 通过淘宝lib-flexible实现动态计算rem

```
1. 安装 npm i lib-flexible --save

2. 引入lib-flexible import "lib-flexible"
```

# px换算成rem

```
px换算rem可通过一些node包实现，比喻postcss-pxtorem以及px2rem-loader
```

# postcss-pxtorem配置

```javascript

1. 安装 npm i postcss-pxtorem --save-dev

2. 在postcss.config.js中配置

module.exports = {
  plugins: {
    'autoprefixer': {
      browsers: ['Android >= 4.0', 'iOS >= 7']
    },
    'postcss-pxtorem': {
      rootValue: 16,//结果为：设计稿元素尺寸/16，比如元素宽320px,最终页面会换算成 20rem
      propList: ['*']
    }
  }
}

3. 在vue中的vue.config.js中配置

css: {
  loaderOptions: {
    postcss: {
      plugins: [
        require("postcss-pxtorem")({ // 把px单位换算成rem单位
          rootValue: 37.5,
          unitPrecision: 5, // 最小精度，小数点位数
          propList: ["*"], // !不匹配属性（这里是字体相关属性不转换）
          minPixelValue:1 // 替换的最小像素值
        })
      ]
    }
  }
}

```

# px2rem-loader配置

```javascript

1. 安装 npm i px2rem-loader --save-dev

2. 在webpack的loader中配置

module.exports = {
  module: {
    rules: [{
      test: /\.css$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader'
      }, {
        loader: 'px2rem-loader',
        options: {
          remUni: 75,
          remPrecision: 8
        }
      }]
    }]
  }
}
```
