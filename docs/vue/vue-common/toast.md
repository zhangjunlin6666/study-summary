<!--
 * @Author: jackson
 * @Date: 2020-05-25 21:38:40
 * @LastEditors: jackson
 * @LastEditTime: 2020-05-25 21:43:29
-->

# toast组件

``` vue

<template>
    <div class="toast-container" v-show="showToast">{{content}}</div>
</template>

<script>
export default {
    data() {
        return {
            showToast:false,
            content:'',
            duration:1000,
            timer:null
        }
    },
    methods:{
        show(content,duration){
            if(this.timer){
                clearTimeout(this.timer);
            }
            this.content = content || this.content;
            this.duration = duration || this.duration;
            this.showToast = true;
            this.timer = setTimeout(()=>{
                this.showToast = false;
            },this.duration)
        }
    }
}
</script>

<style lang='less' scoped>
.toast-container{
    font-size:12px;
    font-family:PingFangSC-Semibold;
    font-weight:600;
    color:#999999;
    background:rgba(0,0,0,0.8);
    position: fixed;
    z-index:1000;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    border-radius: 5px;
    min-width:100px;
    padding:0 10px;
    box-sizing:border-box;
    text-align: center;
    height:40px;
    line-height:40px;
}
</style>

```

``` javascript

import toast from "./toast";
import Vue from "vue";

let toastInstance = Vue.extend(toast),
  instance;
export default function(){
  if(!instance){
    instance = new toastInstance();
    document.body.appendChild(instance.$mount().$el);
  }
  return instance;
}

```

# 用法

``` javascript

import toast from "./toast/index.js";

toast.show("toast显示一下", 3000)

```
