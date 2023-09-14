import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'cn-ZH',
  title: '学习计算机科学',
  description: '从零掌握编程技术',
  base: '/master-fronted-tech/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: 'local',
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'WebExt', link: 'guide/webExt/webExt' },
      {
        text: 'Bilibili',
        link: 'https://space.bilibili.com/211794005?spm_id_from=333.1007.0.0',
      },
    ],

    sidebar: [
      {
        text: 'Javascript',
        items: [
          // { text: 'Runtime API Examples', link: '/api-examples' },
          { text: 'Typescript', link: '/guide/typescript/handbook' },
          { text: 'Jquery', link: '/api-examples' },
          { text: 'Vue3', link: 'guide/vue3/vue3-beginer' },
        ],
      },
      {
        text: 'CSS',
        items: [
          // { text: 'Runtime API Examples', link: '/api-examples' },
          { text: 'Bootstrap', link: 'guide/bootstrap/bootstrap-beginer' },
        ],
      },
      {
        text: 'HTML',
        items: [
          // { text: 'Runtime API Examples', link: '/api-examples' },
          { text: 'HTML5', link: '/api-examples' },
        ],
      },
    ],
    footer: {
      message:
        'Released under the <a href="https://github.com/vuejs/vitepress/blob/main/LICENSE">MIT License</a>.',
      copyright:
        'Copyright © 2013-present <a href="hhttps://github.com/joqk12345/">Galaxies</a>',
    },
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/joqk12345/master-fronted-tech',
      },
    ],
  },
  markdown: {
    theme: 'material-theme-palenight',
    lineNumbers: true,

    // adjust how header anchors are generated,
    // useful for integrating with tools that use different conventions
    anchor: {
      slugify(str) {
        return encodeURIComponent(str)
      },
    },
  },
})
