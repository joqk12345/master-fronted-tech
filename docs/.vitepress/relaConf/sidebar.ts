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
  'content/creation/': [
    {
      text: '抖音',
      items: [
        {
          text: '2024',
          link: '/content/creation/douyin/2024.md',
        },
        {
          text: '2023',
          link: '/content/creation/douyin/2023.md',
        },
      ],
    },
    {
      text: '小红书-科技',
      items: [
        {
          text: '2024',
          link: '/content/creation/tech/2024.md',
        },
        {
          text: '2023',
          link: '/content/creation/tech/2023.md',
        },
      ],
    },
    {
      text: '小红书-投资',
      items: [
        {
          text: '2024',
          link: '/content/creation/invest/2024.md',
        },
        {
          text: '2023',
          link: '/content/creation/invest/2023.md',
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
        {
          text: '1115-数字化转型',
          link: '/content/English/2024/20240115.md',
        },
        {
          text: '1116-经济机器的最小结构',
          link: '/content/English/2024/20240116.md',
        },
        {
          text: '1117-经济增长的三个主要动力',
          link: '/content/English/2024/20240117.md',
        },
        {
          text: '1118-债务周期',
          link: '/content/English/2024/20240118.md',
        },
        {
          text: '1119-现代经济体系',
          link: '/content/English/2024/20240119.md',
        },
        {
          text: '1120-技术是通缩通的',
          link: '/content/English/2024/20240120.md',
        },
        {
          text: '1121-软件吞噬世界',
          link: '/content/English/2024/20240121.md',
        },
        {
          text: '1122-六大描述技术通缩的定律',
          link: '/content/English/2024/20240122.md',
        },
        {
          text: '1123-技术的瓶颈',
          link: '/content/English/2024/20240123.md',
        },
        {
          text: '1124-行业发展的拐点',
          link: '/content/English/2024/20240124.md',
        },
        {
          text: '1125-GDP的弊端',
          link: '/content/English/2024/20240125.md',
        },
        {
          text: '1126-经济的价值的核心是什么',
          link: '/content/English/2024/20240126.md',
        },
        {
          text: '1127-过去的经济与现代的经济增长',
          link: '/content/English/2024/20240127.md',
        },
        {
          text: '1128-由消费经济到体验经济',
          link: '/content/English/2024/20240128.md',
        },
        {
          text: '1129-经济如何增长',
          link: '/content/English/2024/20240129.md',
        },
        {
          text: '1130-Metaverse-构造的数字世界',
          link: '/content/English/2024/20240130.md',
        },
        {
          text: '1131-富足-通用计算与通用智能（软件吞噬世界，人工智能吞噬软件！）',
          link: '/content/English/2024/20240131.md',
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
