import { defineConfig } from 'vitepress'
import { nav } from './relaConf/navbar';
import { sidebar } from './relaConf/sidebar';
import markdownItAnchor from 'markdown-it-anchor'
import footnote from 'markdown-it-footnote'
// https://vitepress.dev/reference/site-config
export default defineConfig({
    lang: 'cn-ZH',
    title: 'Gizmo的内容空间',
    description: '掌握各种技术以及原理',
    base: '/master-fronted-tech/',
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        logo: '/avatar.jpg',
        search: {
            provider: 'local',
        },
        outline: {
            level: [2,4],
            label: '本页目录',
        },
        i18nRouting: true,
        nav:nav,
        sidebar: sidebar,
        footer: {
            message:
            'Released under the <a href="https://github.com/vuejs/vitepress/blob/main/LICENSE">MIT License</a>.',
            copyright:
            'Copyright © 2013-present <a href="hhttps://github.com/joqk12345/">Gizmo的小宇宙</a>',
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
        math:true,
        //lineNumbers: true,
        anchor: {
            // permalink: markdownItAnchor.permalink.headerLink()
            //     slugify(str) {
            //return encodeURIComponent(str)
            // }
        },
        toc:{level:[2,3,4]},
        config: (md) => {
            // use more markdown-it plugins!
            md.use(footnote);
        }
    },
})
