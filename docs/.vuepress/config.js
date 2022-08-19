/*
 * @Author: jackson
 * @Date: 2020-01-02 17:47:15
 * @LastEditors: jackson
 * @LastEditTime: 2020-06-12 08:42:08
 */ 
/*
 * @Author: jackson
 * @Date: 2020-01-02 17:47:15
 * @LastEditors: jackson
 * @LastEditTime: 2020-05-23 16:48:10
 */
const path = require("path");
module.exports = {
    // permalink: "/:year/:month/:day/:slug", // 设置页面的路径，根据更新年月日来
    base: '/study-summary/', // 项目部署的跟路径
    title: '心尘的技术博客', // 页面标题
    description: '前端学习 学习记录 工作记录 博客收集', // 页面描述
    head: [
        ['link', { rel: 'icon', type: "image/x-icon", href: `/study-summary/img/logo.jpg`}], // // 页面link标签
        ['script', { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.slim.min.js' }],
        ['script', { src: 'https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.2/jquery.fancybox.min.js' }],
        ['link', { rel: 'stylesheet', type: 'text/css', href: 'https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.2/jquery.fancybox.min.css' }]
    ],
    themeConfig: {
        logo: '/img/logo.jpg',
        nav: [
            { text: '基础相关', link: '/base/markdown/' },
            { 
                text: 'vue生态相关', 
                items: [
                    {
                        text: 'vue常用技巧',
                        link: '/vue/vue-common/'
                    },
                    {
                        text: 'vuex相关',
                        link: '/vue/vuex/'
                    },
                    {
                        text: 'vue-router相关',
                        link: '/vue/vue-router/' 
                    },
                    {
                        text: 'vue相关',
                        link: '/vue/vue-resource/'
                    },
                ]
            },
            {
                text: "总结",
                items: [
                    { text: "工作积累",link: "/summary/workSummary/"},
                    { text: "项目心得",link: "/summary/project/"},
                    { text: "博客收集",link: "/summary/blog/"}
                    // { text: "读书总结",link: "/summary/readSummary/"}
                ]
            }
        ],
        repo: "zhangjunlin6666/study-summary",
        editLinks: true,
        docsDir: "docs",
        editLinkText: "在 GitHub 上编辑此页",
        lastUpdated: "上次更新",
        smoothScroll: true,
        // sidebarDepth: 1,
        sidebar: {
            '/base/': [
                {
                    title: "markdown语法",
                    children: [
                        ['markdown/', 'markdown介绍'],
                        ['markdown/title', '标题'],
                        ['markdown/block-quotations', '区块引用'],
                        ['markdown/list', '列表'],
                        ['markdown/code-area-block', '代码区块'],
                        ['markdown/hr', '分割线'],
                        ['markdown/insert-link', '插入连接'],
                        ['markdown/insert-img', '插入图片'],
                        ['markdown/semantics', '语义'],
                        ['markdown/inline-marking', '行内标记'],
                        ['markdown/code-block', '代码块'],
                        ['markdown/table', '表格'],
                        ['markdown/footnote', '脚注'],
                        ['markdown/auto-link', '自动链接'],
                        ['markdown/slash-escape', '斜杠转义'],
                        // ['/markdown/sequence-diagram', '时序图'],
                        // ['/markdown/flow-chart', '流程图'],
                    ]
                },
                {
                    title: "数据结构与算法",
                    children: [
                        ['algorithm/stack', '栈'],
                    ]
                },
            ],
            '/vue/': [
                {
                    title: "vue常用技巧",
                    children: [
                        ['vue-common/', '主题'],
                        ['vue-common/componentization-communication', 'vue组件化与通信'],
                        {
                            title: "自定义组件",
                            children: [
                                ['vue-common/components/loading', 'loading组件'],
                                ['vue-common/components/toast', 'toast组件'],
                                ['vue-common/components/cart-ball', '购物车小球组件'],
                                ['vue-common/components/mask', '蒙层组件']
                            ]
                        }
                    ]
                },
                {
                    title: "vuex相关",
                    children: [
                        ['vuex/', '主题'],
                        ['vuex/vuex-resource-resolve', 'vuex源码解读'],
                    ]
                },
                {
                    title: "vue-router相关",
                    // collapsable: false, 是否展开菜单
                    children: [
                        ['vue-router/', '主题'],
                        ['vue-router/vue-router-resource-resolve', 'vue-router源码解读']
                    ]
                },
                {
                    title: "vue源码",
                    sidebarDepth: 2,
                    children: [
                        ['vue-resource/','主题'],
                        ['vue-resource/vue-entry','vue入口查找'],
                        ['vue-resource/vue-init','vue初始化']
                    ]
                }
            ],
            '/summary/': [
                {
                    title: "工作积累",
                    sidebarDepth: 1,
                    children: [
                        ['workSummary/', "主题"],
                        ['workSummary/cookie', "cookie"],
                        ['workSummary/rem', "rem适配"],
                        ['workSummary/print', "js打印"],
                        ['workSummary/network', "网速检测"],
                        ['workSummary/sliceUpload', "分片上传"],
                        ['workSummary/pictureCompression', "图片压缩"],
                        {
                            title: "webrtc相关",
                            children: [
                                ["workSummary/webrtc/getParams", "获取当前音视频参数"]
                            ]
                        },
                        ['workSummary/other', "其他"]
                    ]
                },
                {
                    title: "项目心得",
                    children: [
                        ['project/', "主题"],
                        {
                            title: "后台管理系统",
                            children: [
                                ["project/backEndSystem/vue", "vue技术栈"]
                            ]
                        }
                    ]
                },
                {
                    title: "技术博客收集",
                    path: "blog/"
                }
            ]
        }
    },
    markdown: {
        lineNumbers: true, // 为代码快配置行号
    },
    plugins: [
        ['@vuepress/back-to-top', true],
        ['@vuepress/active-header-links'],
        ['container', {
            type: 'vue',
            before: '<pre class="vue-container"><code>',
            after: '</code></pre>'
        }],
        ['container', {
            type: 'upgrade',
            before: info => `<UpgradePath title="${info}">`,
            after: '</UpgradePath>'
        }],
    ],
    configureWebpack: {
        resolve: {
            alias: {
            '@': path.resolve(__dirname, "./../../docs/")
            }
        }
    }
}