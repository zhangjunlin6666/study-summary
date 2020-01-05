/*
 * @Author: jackson
 * @Date: 2020-01-02 17:47:15
 * @LastEditors  : jackson
 * @LastEditTime : 2020-01-05 21:20:42
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
            // { text: 'vue源码解读', link: ''}
        ],
        repo: "zhangjunlin6666/study-summary",
        editLinks: true,
        docsDir: "docs",
        editLinkText: "在 GitHub 上编辑此页",
        lastUpdated: "上次更新",
        sidebarDepth: 1,
        sidebar: [
            {
                title: "markdown语法",
                collapsable: false,
                children: [
                    ['/markdown/', 'markdown简介'],
                    ['/markdown/title', '标题']
                ]
            }
        ]
    },
    markdown: {
        lineNumbers: true
    },
    plugins: [['@vuepress/back-to-top', true],['@vuepress/active-header-links']]
}