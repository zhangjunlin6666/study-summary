<!--
 * @Author: jackson
 * @Date: 2020-05-22 23:27:50
 * @LastEditors: jackson
 * @LastEditTime: 2020-05-23 00:08:14
-->

# rem

[移动端rem布局的通俗易懂](https://www.jianshu.com/p/64e5834cc81d)

[rem换算](https://www.jianshu.com/p/d9606faafbaf)

[rem布局原理深度理解（以及em/vw/vh）](https://www.cnblogs.com/leaf930814/p/9059340.html)

# 动态计算rem

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

```

# px换算成rem

px换算rem可通过一些node包实现，比喻postcss-pxtorem以及