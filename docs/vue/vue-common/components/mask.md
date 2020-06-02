# 移动端蒙层组件（pc端改造后也可以使用）

``` vue
<!--
 * @Author: jackson
 * @Date: 2019-09-05 13:47:33
 * @LastEditors: jackson
 * @LastEditTime: 2020-05-28 00:18:18
 -->
<template>
    <div class="mask" @touchmove.prevent @click.self.prevent='closeMask'>
        <slot></slot>
        <div class="close-container" :style='closeStyle' @click='closeMask'></div>
    </div>
</template>

<script>
export default {
    props: {
        closeStyle: {
            type: Object,
            default() {
                return {
                    position: 'absolute',
                    top: '75%',
                    left: '50%',
                    marginLeft: '-0.45rem'
                }
            }
        }
    },
    methods: {
        closeMask(){
            this.remove();
        }
    }
}
</script>

<style lang="scss" scoped>
.mask{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 2000;
}
.close-container{
    width: 90px;
    height: 90px;
    background:rgba(0,0,0,1) url('./../../../assets/img/common/close.png') no-repeat center;
    background-size: 100% 100%;
    border-radius: 50%;
    -webkit-tap-highlight-color: transparent;
}
</style>
```

``` javascript

/*
 * @Author: jackson
 * @Date: 2019-09-05 13:47:27
 * @LastEditors: jackson
 * @LastEditTime: 2019-09-09 16:56:30
 * 
 * @params component {VueCopment} 给蒙层传入的组件
 * @params childrenProps {object} 传入组件的属性
 * @params currentProps {object} 蒙层的属性
 */
import Vue from 'vue';
import mask from './mask';

export default function(component, currentProps = {}, childrenProps = {}){
    let vm = new Vue({
        render(h){
            return h(mask, {
                    ...currentProps
                },[
                h(component, {
                    ...childrenProps
                })]
            )
        } 
    }).$mount();
    function remove(){
        document.body.removeChild(vm.$el);
        vm.$destroy();
    }
    let maskDom = document.getElementsByClassName(vm.$el.className)[0]; // 获取mask元素
    if(maskDom){
        remove(); // 判断是否存在mask，存在就删除，注意执行顺序，需要放在appendChild前
    };
    document.body.appendChild(vm.$el); // vm.$el返回的是真实的dom元素
    const currentComp = vm.$children[0]; // 获取mask实例
    currentComp.remove = remove; // 给mask组件添加一个remove方法
    currentComp.$children[0].remove = remove; // 给mask的子组件添加remove方法，如果后续还有子组件那就改为递归
    return currentComp.$children[0]; // 将传入的子组件抛出方便在调用蒙层函数时可以访问子组件中的方法
}

```

# 用法

``` javascript

/*
 * @Author: jackson
 * @Date: 2019-09-09 17:26:08
 * @LastEditors: jackson
 * @LastEditTime: 2019-09-09 17:27:03
 */
import mask from '@/components/global/mask';
import submit from '@/components/global/submit';
export default function renderSubmit(){
    let currentProps = {
        props: { 
            closeStyle: {
                position: 'absolute',
                top: '1.05rem',
                right: '0.57rem'
            } 
        }
    };
    mask(submit, currentProps); 
}

```