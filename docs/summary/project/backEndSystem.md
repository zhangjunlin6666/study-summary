<!--
 * @Author: jackson
 * @Date: 2020-06-02 23:01:49
 * @LastEditors: jackson
 * @LastEditTime: 2020-06-03 00:12:30
-->

# 后台管理系统

::: tip
该模块记录在后台管理系统开发过程对于路由无限嵌套、面包屑以及动态路由处理的心得。
:::

## 路由无限嵌套处理

在开发后台管理系统过程中，常常会遇到路由无限嵌套的情况，这时候对于我们的路由配置文件来说，有多少个children，理论上来说我们就要嵌套多少个router-view，这样的话就显得很麻烦，那么有没有更优雅的处理方式呢？下面就介绍两种路由无限嵌套的处理方式。

### 空页面

定义一个只有router-view组件的空白页面。

``` vue
<template>
  <div class="">
    <transition name="fade">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
  export default {
    name: 'empty'
  }
</script>

<style scoped lang='less'>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .3s
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }
</style>

```

路由配置

``` javascript
<!--
    如果有需要嵌套的路由，就加一个component为empty的路由，这样就可以达到路由无限嵌套的效果
-->

import empty from "@/components/empty";
export default [
    {
    path: "/yunyingsoftware",
    name:"YunyingSoftware",
    component: Layout,
    redirect:"/yunyingsoftware/install",
    meta: {
      title:"云影软件版本管理"
    },
    children: [
        {
            path: "install",
            name: "YunYingInstall",
            component: empty,
            redirect:"/yunyingsoftware/install/list",
            meta: {
                title: "安装包管理"
            },
            children: [
                {
                    path: "list",
                    name: "YunYingInstallList",
                    component: () => import("@/views/yunying-software/install/list"),
                    meta: {
                        title: "安装包管理"
                    }
                },
                {
                    path: "upload",
                    component: () => import("@/views/yunying-software/install/upload"),
                    name: "YunYingInstallUpload",
                    hidden: true,
                    meta: {
                        title: "上传安装包"
                    }
                }
            ]
        }
    ]
  }
]
```

路由扁平化

``` javascript

/**
 *  @routes: 该参数为路由配置数组，最终处理的结果是让二级菜单下的所有菜单与二级菜单同级，这样就解决了路由的无限嵌套
 */

function transRoutes(routes) {
  let realRouters = [];
  routes.forEach(item => {
    if (item.children && item.children.length > 0) {
      let object = {
        path: item.path,
        name: item.name,
        component: item.component,
        meta: item.meta,
        children: []
      };
      findRoute(item, object.children);
      realRouters.push(object);
    } else {
      realRouters.push(item);
    }
  });
  return realRouters;
}

function findRoute(item, children) {
  item.children.forEach(ite => {
    let obj = {
      path: ite.path,
      name: ite.name,
      component: ite.component,
      meta: ite.meta
    };
    children.push(obj);
    if (ite.children && ite.children.length > 0) {
      findRoute(ite, children);
    }
  });
}
export {
  transRoutes
};
```

## 面包屑的处理

``` javascript
<!--

-->
export const getBreadCrumbList = (route, routes) => {
  if(sessionStorage.getItem("breadCrumbList")){
    let breadCrumbList = JSON.parse(sessionStorage.getItem("breadCrumbList"));
    sessionStorage.removeItem("breadCrumbList");
    return breadCrumbList;
  }
  let NameArr = [],
    index = 0,
    hasParentId = (function loop(routes, index) {
      return routes.some((item) => {
        if (item.name === route.name) {
          item.query = route.query;
          NameArr = NameArr.slice(0, index);
          NameArr.push(item);
          return true;
        } else if (Array.isArray(item.children)) {
          NameArr[index] = item;
          return loop(item.children, index + 1);
        } else {
          return false;
        }
      });
    })(routes, index);
  let breadCrumbList = JSON.parse(sessionStorage.getItem("breadCrumbList"));
  if(breadCrumbList&&breadCrumbList.length){
    NameArr.forEach( item => {
      breadCrumbList.forEach( it => {
        if(item.name === it.name){
          item.query = it.query
        }
      })
    })
  }
  sessionStorage.setItem("breadCrumbList",JSON.stringify(NameArr))
  return hasParentId ? NameArr : [];
};

```

## 动态路由

