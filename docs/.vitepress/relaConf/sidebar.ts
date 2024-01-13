export * from './sidebar'
import { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Sidebar = {
  'blockchain/ETH/': [
    {
      text: '智能合约',
      items: [
        {
          text: '智能合约介绍',
          link: '/blockchain/ETH/001_eth2.0',
        },
      ],
    },
  ],
  // column/Algothm/表示对这个文件夹下的所有md文件做侧边栏配置
  'column/Algorithm/': [
    // 第一部分
    {
      text: '栈和队列',
      items: [
        {
          text: '栈-深拷贝和浅拷贝',
          link: '/column/Algorithm/001_stack',
        },
        {
          text: '队列-事件循环',
          link: '/column/Algorithm/002_queue',
        },
      ],
    },
    // 第二部分
    {
      text: '字典和树',
      items: [
        {
          text: '字典和集合-Set和Map',
          link: '/column/Algorithm/003_dictionary',
        },
        {
          text: '树-深/广度优先遍历',
          link: '/column/Algorithm/004_tree',
        },
      ],
    },
  ],
  'content/English/2024/': [
    {
      text: '2024-01',
      items: [
        {
          text: '1109-任务启动',
          link: '/content/English/2024/20240109.md',
        },
        {
          text: '1110-对高管的看法',
          link: '/content/English/2024/20240110.md',
        },
        {
          text: '1111-数字重塑人生',
          link: '/content/English/2024/20240111.md',
        },
        {
          text: '1112-康威定律的应用',
          link: '/content/English/2024/20240112.md',
        },
        {
          text: '1113-能源、智能和灵活性如何影响经济',
          link: '/content/English/2024/20240113.md',
        },
        {
          text: '1114-有效加速主义',
          link: '/content/English/2024/20240114.md',
        },
      ],
    },
  ],
  'guide/javascript/': [
    {
      text: 'Javascript',
      items: [{ text: 'Promise', link: '/guide/javascript/001_basic' }],
    },
  ],
  'guide/': [
    {
      text: 'Vue3',
      items: [{ text: 'Store', link: '/guide/vue3/001-pinia' }],
    },
    {
      text: 'CSS',
      items: [
        // { text: 'Runtime API Examples', link: '/api-examples' },
        { text: 'Bootstrap', link: 'guide/bootstrap/bootstrap-beginer' },
        { text: 'CSS3', link: 'guide/css/001_layout' },
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
}
