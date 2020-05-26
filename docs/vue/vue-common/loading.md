<!--
 * @Author: jackson
 * @Date: 2020-05-25 11:45:08
 * @LastEditors: jackson
 * @LastEditTime: 2020-05-25 21:41:11
-->

# loading组件

``` vue
<template>
    <div class='loading-container' v-show='showLoading'>
        <div>
            <img src="./loading.gif" alt="">
            <span>正在加载</span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showLoading:false
        }
    },
    methods:{
        show(){
            this.showLoading = true;
        },
        close(){
            this.showLoading = false;
        }
    }
}
</script>

<style lang='less'>
.loading-container{
    font-family:PingFangSC-Semibold;
    font-weight:600;
    color:#999999;
    background:rgba(0,0,0,0.8);
    border-radius: 5px;
    width:100px;
    height:50px;
    position: fixed;
    top:50%;
    left:50%;
    margin-left:-50px;
    margin-top:-30px;
    div{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size:10px;
        img{
            width:30px;
            height:30px;
        }
    }
}
</style>

```

``` javascript

import loading from "./loading";
import Vue from "vue";
let loadingInstance = Vue.extend(loading);
export default function(){
  let instance = new loadingInstance(),
    $el = instance.$mount().$el;
  document.body.appendChild($el);
  return instance;
}

```

# 用法

``` javascript

import loading from "./loaing/index.js";

loading.show();
setTimeout(() => {
    loading.close();
}, 2000);

```
