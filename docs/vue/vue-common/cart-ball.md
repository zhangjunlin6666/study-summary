<!--
 * @Author: jackson
 * @Date: 2020-05-25 22:01:01
 * @LastEditors: jackson
 * @LastEditTime: 2020-05-25 22:09:14
-->

# 购物车小球动画

``` javascript

import Vue from "vue";

class CartBall {
  constructor() {
    this._body = document.body || document.documentElement;
    this._target = null
    this._cart = null
    this.src = ""
  }
  add (options) {
    this._cart = document.getElementById('cart')
    const { from, src } = options;
    if (!this._cart || !from) return
    const { left: originL, top: originT } = from.getBoundingClientRect();
    this.init(originL, originT, src)
  }
  init (...rest) {
    this._target = this._cart.getBoundingClientRect()
    this._cart.className = ""
    this.create(...rest)
  }
  create(l, t, src) {
    const ball = document.createElement('div');
    const ballInner = document.createElement('div')
    let moveX = this._target.x - l
    let moveY = t - 40
    ball.style = `
      position: absolute;top: ${t}px; left: ${l}px;transition: all 1s cubic-bezier(0, 0, 0, 0);`
    ballInner.style = `
      transition: all 1s cubic-bezier(0.89, 0.25, 1, 1);
      animation-name: fadeOut;
      animation-duration: 1.1s;
      animation-fill-mode: both;
    `
    ballInner.innerHTML = `
      <img style="width:24px;height:24px;border-radius:50%" src=${src} />
    `
    ball.append(ballInner)
    this._body.append(ball);
    let ballTimer = setTimeout(() => {
      clearInterval(ballTimer)
      ballInner.style.transform = `translate3d(0, -${moveY}px, 0)`
      ball.style.transform = `translate3d(${moveX}px, 0, 0)`
    }, 100);
    let cartTimer = setTimeout(() => {
      clearInterval(cartTimer)
      this._cart.className = "shake"
    }, 1000);
  }
}

Vue.prototype.$cartBall = new CartBall();

```

# 用法

``` javascript

在main.js中引入该js

this.$cartBall.add({
    from: "小球的初始位置",
    src: "商品图片"
})
```