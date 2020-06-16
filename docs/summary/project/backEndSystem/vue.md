<!--
 * @Author: jackson
 * @Date: 2020-06-02 23:01:49
 * @LastEditors: jackson
 * @LastEditTime: 2020-06-12 08:50:29
-->

# 后台管理系统

::: tip
该模块记录在后台管理系统开发过程对于路由无限嵌套、面包屑以及动态路由处理的心得。
:::

## 路由无限嵌套处理

在开发后台管理系统过程中，常常会遇到路由无限嵌套的情况，这时候对于我们的路由配置文件来说，有多少个children，理论上来说我们就要嵌套多少个router-view，这样的话就显得很麻烦，那么有没有更优雅的处理方式呢？下面就介绍两种路由无限嵌套的处理方式。

## 空页面

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
/*
  如果有需要嵌套的路由，就加一个component为empty的路由，这样就可以达到路由无限嵌套的效果
*/

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

## 路由扁平化

``` javascript

/**
 *  routes该参数为路由配置数组，最终处理的结果是让二级菜单下的所有菜单与二级菜单同级，
    这样就解决了路由的无限嵌套，菜单的隐藏在meta字段中设置，比喻hidden：true
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
/*
  入参：
    route为当前路由对象
    routes为路由配置对象
  
  函数调用：
    在面包屑组件的watch中监听路由变化，调用getBreadCrumbList方法

  返回值：
    返回值为一个数组，在页面中通过v-for循环该数组即可得到面包屑

*/
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

动态路由配置模块，动态路由在配置的时候，前端需要给管理员提供一个json文件，该文件输出的是一个路由配置，当有新添加的路由时，需要及时的与管理同步并更新json

``` javascript
/*
  /module/affair module下的affair
*/
export default {
  // 教务管理 —— 课程管理
  CourseList: {
    component: "import你的组件", // CourseList对应的组件
    children: [
      {
        path: "/affair/courseManagement/add",
        name: "CourseAdd",
        component: "import你的组件",
        meta: {
          title: "添加课程",
          hideInMenu: true
        }
      },
      {
        path: "/affair/courseManagement/detail",
        name: "CourseDetail",
        component: "import你的组件",,
        meta: {
          title: "课程详情",
          hideInMenu: true
        },
        children: [
          {
            path: "/affair/courseManagement/prepareLessonsPreclass",
            name: "PrepareLessonsPreclass",
            component: "import你的组件",,
            meta: {
              title: "备课-课前测",
              hideInMenu: true
            }
          }
        ]
      },
    ]
  },

  // 教务管理 —— 课程表
  CourseTableList: {
    component: courseTableList
  },

  // 教务管理 —— 成绩分析
  AffairGradeList: {
    component: gradeList,
    children: [{
      path: "/affair/grade/detail",
      name: "AffairGradeDetail",
      component: gradeDetail,
      meta: {
        title: "成绩分析详情",
        hideInMenu: true
      }
    }]
  }
}

```

不需要权限的路由配置模块

``` js
import affairList from "./module/affair";

const Login = () => import("@/components/login.vue"), // 登录页
      Error404 = () => import("@/components/pages/error-page/404.vue"), // 404页面
      Index = () => import("@/components/index.vue"), // 欢迎页面
      Loyon = () => import("@/components/loyon.vue"); // 布局页

const route404 = {
  path: "*",
  name: "error_404",
  meta: {
    hideInMenu: true,
    title: "404",
    noChildren: true
  },
  component: Error404
};

// 动态生成欢迎页路由配置
function routeIndex(name){
  return {
    path: "",
    name: `${name}Index`,
    component: Index,
    meta: {
      title: "首页",
      hideInMenu: true,
      noChildren: true
    }
  };
};
  

// 不需要权限的路由
const constantRoutes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: {
      title: `腾跃双师|登录`,
      hideInMenu: true
    }
  },
  { // 当没有角色时，即用户登录没有菜单，此时应显示欢迎页
    path: "/welcome",
    name: "Welcome",
    component: Loyon,
    meta: {
      hideInMenu: true
    },
    children: [
      {
        path: "",
        name: "WelcomeIndex",
        component: Index,
        meta: {
          title: "欢迎使用双师课堂管理系统",
          hideInMenu: true
        },
      }
    ]
  }
];

// 路由对应的路由表，根据后端返回的name值来匹配组件，因此，所以路由的name值不能重复，
const routerMap = {
  ...affairList
};

export {
  constantRoutes,
  routerMap,
  route404,
  routeIndex,
  Loyon
};

```

开发中路由添加

``` js
/**
 * 开发配置路由 自行在devRouters中添加 需要配置的路由其他地方不需要动
 * @param {routers} 入参为请求的菜单数组
 */
export default function(routers) {
  const devRouters = {
    Affair: {
      router: [
        {
          meta: { title: "协议管理", icon: "" },
          name: "agreement",
          path: "/operate/agreement",
          children: [
            {
              meta: { title: "合作协议管理", icon: "" },
              name: "cooperation",
              path: "/operate/agreement/cooperation"
            },
            {
              meta: { title: "补充协议管理", icon: "" },
              name: "supplementary",
              path: "/operate/agreement/supplementary"
            }
          ]
        }
      ]
    }
  };
  routers.forEach(item => {
    Object.keys(devRouters).forEach(itm => {
      if (itm == item.name) {
        const id = item.id;
        const childrenId = item.children[item.children.length - 1].id;
        devRouters[itm].router.forEach((it, i) => {
          item.children.push(
            Object.assign({id: Number(childrenId) + i + 1, parent_id: id},it)
          );
        });
      }
    });
  });
  return routers;
}

```

在路由全局守卫beforeEnter中的处理

``` js
/*
  对于刷新页面动态菜单丢失的问题，可以有两种处理方式
  1、通过在beforeEnter中进行设置，即每次跳转路由时，都会获取菜单
  2、在登录时直接请求菜单接口，通过vuex与localstorage持久化实现

  这里采用的是第一中方案
*/

import Vue from "vue";
import Router from "vue-router";
import { LoadingBar, Message } from "view-design";
import { constantRoutes, routerMap, route404, Loyon, routeIndex } from "./routes";
import { transRoutes } from "./transRoutes"; // 路由扁平化的js处理程序
import store from "@/vuex/index";
import { Cookie } from "@/api/cookie.js";
import concatDevTestRouters from './concatDevTestRouters';

Vue.use(Router);

const router = new Router({
  mode: "hash",
  routes: constantRoutes
});

router.beforeEach((to, from, next) => {
  const token = Cookie("AUTH_TOCKEN"),
        loginName = "Login";
  if(!token){
    if(to.name !== loginName){
      next('/');
    } else {
      next();
    }
  } else {
    // 这里是动态路由逻辑
    const sideMenuListForStore = store.state.sideMenuList
    // 判断store中是否存在sideMenuList，没有就请求
    if(!Array.isArray(sideMenuListForStore) || !sideMenuListForStore.length){
      // user/getSideMenu为请求当前用户所拥有的菜单权限action，数据中的name与当前路由对象的name一一对应，并且要惟一
      store.dispatch('user/getSideMenu').then((sideMenuList) => {
        // 递归菜单，根据routerMap匹配每个路由的component属性
        function deep(arr){
          arr.forEach(item => {
             // 对于动态插入进来的404和欢迎页不需要做匹配操作
            if(!item.meta.noChildren){
              if(routerMap[item.name]){
                item.meta = {
                  ...routerMap[item.name].meta,
                  ...item.meta
                };
                // routerMap的key与菜单的name对应，value为{ component: A, children: []}
                item.component = routerMap[item.name].component;
                 // 如果有children递归匹配componet
                if(item.children && item.children.length){
                  deep(item.children);
                } else {
                  /* sideMenuList只包含菜单列表，而不包括如何添加、编辑等页面，
                    所以这里需要手动添加，通过routerMap[key]中是否包含children来判断，
                    比喻：
                      routerMap = {
                        system: system,
                        children: []
                      }
                  */
                  if(routerMap[item.name].children){
                    item.children = routerMap[item.name].children;
                  }
                }
              }
            }
          })
        }

        /*
          处理开发中路由，动态路由需要后端在数据库中写入，在开发过程中前端很受限制
          所以需要在代码中混入开发中的路由，待上线时，在concatDevTestRouters中
          删除不必要的路由即可
        */
        sideMenuList = concatDevTestRouters(sideMenuList)


        sideMenuList.forEach(item => {
          // 给每个模块的根路径添加component属性，即布局组件
          item.component = Loyon;
          // 给每个根路径的children添加欢迎页
          item.children.unshift(routeIndex(item.name))
          // 递归菜单的children，添加component属性
          deep(item.children);
        })
        // 需要将404添加到路由配置的最后一项
        sideMenuList.push(route404);
        // 在store中存储sidemenu
        store.commit("user/setSideMenu", sideMenuList);
        // transRoutes扁平化路由，router.addRoutes动态加载
        router.addRoutes(transRoutes(sideMenuList));
        next({ ...to, replace: true })
      }).catch(err => {
        Message.error(err);
      });
    } else {
      /*
        emptyRoutePath是一个过渡路由path，在store定义
          例如：/$transition-path，切记/不能丢

          作用：
            当在路由的全局钩子中获取动态路由后，由于是动态、异步加载路由配置，所以不知道具体跳转哪个地址，
            通过一个过渡地址进行跳转，触发全局路由拦截钩子，让页面跳转至一个不存在的地址触发全局钩子，
            从而跳转至sideMenuList的第一项path对应的页面；

            this.$router.push(this.$store.state.emptyRoutePath);
      */
      if(to.path === store.state.emptyRoutePath){
        // 当请求菜单数组为[]时，只有一个路由配置，即404的配置，这是在if中push进去的404
        if(sideMenuListForStore.length == 1){
          next({ path: "/welcome", replace: true });
        } else {
          // 默认跳转sideMenuListForStore的第一项
          next({ path: sideMenuListForStore[0].path, replace: true })
        }
      } else {
        // 动态修改标题
        document.title = to.meta.title;
        LoadingBar.start();
        //当有用户权限的时候，说明所有可访问路由已生成，如访问没权限的全面会自动进入404页面
        next()
      }
    }
  }



});

router.afterEach(() => {
  LoadingBar.finish();
});

export default router;

```

## 页面效果

<a data-fancybox title="Alt text" href="/img/showPage.png">![Alt text](/img/showPage.png "页面效果")</a>
