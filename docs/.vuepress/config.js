/*
 * @Author: jackson
 * @Date: 2020-01-02 17:47:15
 * @LastEditors  : jackson
 * @LastEditTime : 2020-01-18 19:53:36
 */
module.exports = {
    base: '/study-summary/',
    title: '心尘的技术博客',
    description: '前端学习 技术文章 学习记录',
    head: [
        ['link', { rel: 'icon', type: "image/x-icon", href: `/study-summary/img/logo.jpg`}]
    ],
    themeConfig: {
        logo: '/img/logo.jpg',
        nav: [
            { text: 'markdown语法', link: '/markdown/' },
            // { text: 'vupress搭建', link: '' },
            { 
                text: 'vue相关', 
                items: [
                    {
                        text: 'vue组件化与通信',
                        link: '/vue/componentization-communication'
                    },
                    {
                        text: 'vue生态源码分析',
                        items: [
                            {
                                text: 'vuex源码解读',
                                link: '/vue/vuex-resource-resolve'
                            },
                            {
                                text: 'vue-router源码解读',
                                link: '/vue/vue-router-resource-resolve'
                            },
                            {
                                text: 'vue源码解读',
                                link: '/vue/vue-resource/vue-entry'
                            },
                        ]
                    },
                ]
            }
        ],
        repo: "zhangjunlin6666/study-summary",
        editLinks: true,
        docsDir: "docs",
        editLinkText: "在 GitHub 上编辑此页",
        lastUpdated: "上次更新",
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
                    title: "vue生态相关源码",
                    collapsable: false,
                    children: [
                        ['componentization-communication', 'vue组件化与通信'],
                        ['vuex-resource-resolve', 'vuex源码解读'],
                        ['vue-router-resource-resolve', 'vue-router源码解读']
                    ]
                },
                {
                    title: "vue源码",
                    collapsable: false,
                    sidebarDepth: 2,
                    children: [
                        ['vue-resource/vue-entry','vue入口查找'],
                        ['vue-resource/vue-init','vue初始化']
                    ]
                }
            ]
        }
    },
    markdown: {
        lineNumbers: true
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
    ]
}