export * from './navbar'

import { DefaultTheme } from 'vitepress'
export const nav: DefaultTheme.NavItem[] = [
  {
    text: '首页',
    link: '/', // 表示docs/index.md
  },
  {
    text: 'AI',
    items: [
      {
        text: 'LLM-Inference',
        link: '/AI/inference/inference', // 对应docs/blockchain/ETH/index.md
      },
      {
        text: 'Soft2.0',
        link: '/AI/LLM&Soft2.0.md', //
      },
      {
        text: 'tts',
        link: '/AI/tts/chat_tts.md', //
      },
      {
        text: 'get_start_calculus',
        link: '/AI/calculus/get_start_calculus.md', //
      },
      {
        text: 'mathematics-topics',
        link: '/AI/math-topic/index.md', //
      },
      {
        text: 'LLVM',
        link: '#', //
      },
    ],
  },
  {
    text: '区块链技术',
    items: [
      {
        text: 'ETH2.0与智能合约',
        link: '/blockchain/ETH/', // 对应docs/blockchain/ETH/index.md
      },
      {
        text: 'BTC与区块链',
        link: '#', //
      },
    ],
  },
  {
    text: '开发',
    items: [
      {
        text: '数据结构与算法',
        link: '/column/Algorithm/', // 对应docs/column/Algorithm下的idnex.md文件
      },
      {
        text: 'JavaScript学习',
        link: '/guide/javascript/', // 对应docs/column/Algorithm下的idnex.md文件
      },
      {
        text: 'TypeScript',
        link: '/guide/typescript/',
      },
      {
        text: 'Learn Vim',
        link: '/content/Vim/',
      },
      {
        text: 'Learn Python',
        link: '/content/python/python_retry.md',
      },
    ],
  },
  {
    text: '个人成长',
    items: [
      {
        text: '2024年英语学习',
        link: '/content/English/2024/index.md', // 表示docs/column/Travel/index.md
      },
      {
        text: '所思·所想',
        link: '/content/creation/index.md', // 表示docs/column/Growing/index.md
      },
      { text: 'WebExt', link: 'guide/webExt/webExt' },
      { text: 'science-topic', link: '/content/science_topic/index.md' },
      { text: 'writing', link: '/content/writing/homework/index.md' },
      {
        text: 'Bilibili',
        link: 'https://space.bilibili.com/211794005?spm_id_from=333.1007.0.0',
      },
    ],
  },
  {
    text: '关于我',
    items: [
      {
        text: 'Github',
        link: 'https://github.com/joqk12345/master-fronted-tech',
      },
      {
        text: '掘金',
        link: 'https://juejin.cn/user/3131845139247960/posts',
      },
      {
        text: '小红书',
        link: 'https://www.xiaohongshu.com/user/profile/6336ea62000000001802a16e',
      },
    ],
  },
]
