/*
 * @Author: jackson
 * @Date: 2020-01-02 17:47:15
 * @LastEditors: jackson
 * @LastEditTime: 2020-05-22 23:28:18
 */
const path = require("path");
module.exports = {
    // permalink: "/:year/:month/:day/:slug", // 设置页面的路径，根据更新年月日来
    base: '/study-summary/', // 项目部署的跟路径
    title: '心尘的技术博客', // 页面标题
    description: '前端学习 学习记录 工作记录 博客收集', // 页面描述
    head: [
        ['link', { rel: 'icon', type: "image/x-icon", href: `/study-summary/img/logo.jpg`}] // // 页面link标签
    ],
    themeConfig: {
        logo: '/img/logo.jpg',
        nav: [
            { text: 'markdown语法', link: '/markdown/' },
            { 
                text: 'vue生态相关', 
                items: [
                    {
                        text: 'vue常用技巧',
                        items: [
                            {
                                text: 'vue组件化与通信',
                                link: '/vue/vue-common/componentization-communication'
                            }
                        ]
                    },
                    {
                        text: 'vuex',
                        items: [
                            {
                                text: 'vuex源码解读',
                                link: '/vue/vuex/vuex-resource-resolve'
                            }
                        ] 
                    },
                    {
                        text: 'vue-router',
                        items: [
                            {
                                text: 'vue-router源码解读',
                                link: '/vue/vue-router/vue-router-resource-resolve'
                            }
                        ] 
                    },
                    {
                        text: 'vue',
                        items: [
                            {
                                text: 'vue源码解读',
                                link: '/vue/vue-resource/vue-entry'
                            }
                        ]
                    },
                ]
            },
            {
                text: "总结",
                items: [
                    {
                        text: "工作总结",
                        items: [
                            {
                                text: "js打印",
                                link: "/summary/workSummary/print",
                            },
                            {
                                text: "cookie",
                                link: "/summary/workSummary/cookie",
                            },
                            {
                                text: "rem",
                                link: "/summary/workSummary/rem",
                            },
                            {
                                text: "webrtc",
                                link: "/summary/workSummary/webrtc",
                            },
                            {
                                text: "network",
                                link: "/summary/workSummary/network",
                            }
                        ]
                    }
                    
                ]
            }
        ],
        repo: "zhangjunlin6666/study-summary",
        editLinks: true,
        docsDir: "docs",
        editLinkText: "在 GitHub 上编辑此页",
        lastUpdated: "上次更新",
        smoothScroll: true,
        sidebarDepth: 1,
        sidebar: {
            '/markdown/': [
                {
                    title: "markdown语法",
                    collapsable: false,
                    children: [
                        ['', 'markdown介绍'],
                        ['title', '标题'],
                        ['block-quotations', '区块引用'],
                        ['list', '列表'],
                        ['code-area-block', '代码区块'],
                        ['hr', '分割线'],
                        ['insert-link', '插入连接'],
                        ['insert-img', '插入图片'],
                        ['semantics', '语义'],
                        ['inline-marking', '行内标记'],
                        ['code-block', '代码块'],
                        ['table', '表格'],
                        ['footnote', '脚注'],
                        ['auto-link', '自动链接'],
                        ['slash-escape', '斜杠转义'],
                        // ['/markdown/sequence-diagram', '时序图'],
                        // ['/markdown/flow-chart', '流程图'],
                    ]
                }
            ],
            '/vue/': [
                {
                    title: "vue常用技巧",
                    children: [
                        ['vue-common/componentization-communication', 'vue组件化与通信']
                    ]
                },
                {
                    title: "vuex相关",
                    children: [
                        ['vuex/vuex-resource-resolve', 'vuex源码解读'],
                    ]
                },
                {
                    title: "vue-router相关",
                    // collapsable: false, 是否展开菜单
                    children: [
                        ['vue-router/vue-router-resource-resolve', 'vue-router源码解读']
                    ]
                },
                {
                    title: "vue源码",
                    sidebarDepth: 2,
                    children: [
                        ['vue-resource/vue-entry','vue入口查找'],
                        ['vue-resource/vue-init','vue初始化']
                    ]
                }
            ],
            '/summary/': [
                {
                    title: "工作总结",
                    children: [
                        ['workSummary/print', 'js打印'],
                        ['workSummary/cookie', 'cookie'],
                        ['workSummary/rem', 'rem'],
                        ['workSummary/webrtc', 'webrtc'],
                        ['workSummary/network', '网速检测'],
                    ]
                }
            ]
        }
    },
    markdown: {
        lineNumbers: true // 为代码快配置行号
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