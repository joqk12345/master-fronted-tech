import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'cn-ZH',
  title: "掌握前端技术",
  description: "从零掌握前端技术",
  base:"/master-fronted-tech/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Vue3', link: 'guide/vue3/vue3-beginer' },
      { text: 'WebExt', link: 'guide/webExt/webExt' },
      { text: 'Bootstrap', link: 'guide/bootstrap/bootstrap-beginer' }
    ],  

    sidebar: [
      {
        text: 'Javascript',
        items: [
          // { text: 'Runtime API Examples', link: '/api-examples' },
          { text: 'Typescript', link: '/api-examples' },
          { text: 'Jquery', link: '/api-examples' },
          { text: 'Vue3', link: 'guide/vue3/vue3-beginer' }
        ]
      },
      {
        text: 'CSS',
        items: [
          // { text: 'Runtime API Examples', link: '/api-examples' },
          { text: 'Bootstrap', link: '/api-examples' },          
        ]
      },
      {
        text: 'HTML',
        items: [
          // { text: 'Runtime API Examples', link: '/api-examples' },
          { text: 'HTML5', link: '/api-examples' },          
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/joqk12345/master-fronted-tech' }
    ]
  }
})
