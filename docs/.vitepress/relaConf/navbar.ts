export * from './navbar';

import { DefaultTheme } from 'vitepress';
export const nav: DefaultTheme.NavItem[] = [
  {
    text: '首页',
    link: '/' // 表示docs/index.md
  },
  {
    text: '前端开发',
    items: [
      {
        text: '数据结构与算法',
        link: '/column/Algorithm/' // 对应docs/column/Algorithm下的idnex.md文件
      }
    ]
  },
  {
    text: '个人成长',
    items: [
      {
        text: '大江南北游记',
        link: '/column/Travel/' // 表示docs/column/Travel/index.md
      },
      {
        text: '所思·所想',
        link: '/column/Growing/' // 表示docs/column/Growing/index.md
      },
      { text: 'WebExt', link: 'guide/webExt/webExt' },
      {
        text: 'Bilibili',
        link: 'https://space.bilibili.com/211794005?spm_id_from=333.1007.0.0',
      },
    ]
  },
  {
    text: '关于我',
    items: [
      { text: 'Github', link: 'https://github.com/joqk12345/master-fronted-tech' },
      {
        text: '掘金',
        link: 'https://juejin.cn/user/3131845139247960/posts'
      },
      {
        text: '小红书',
        link: 'https://www.xiaohongshu.com/user/profile/6336ea62000000001802a16e'
      }
    ]
  }
];

