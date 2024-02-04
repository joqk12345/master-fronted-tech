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
          text: '0109-任务启动',
          link: '/content/English/2024/20240109.md',
        },
        {
          text: '0110-对高管的看法',
          link: '/content/English/2024/20240110.md',
        },
        {
          text: '0111-数字重塑人生',
          link: '/content/English/2024/20240111.md',
        },
        {
          text: '0112-康威定律的应用',
          link: '/content/English/2024/20240112.md',
        },
        {
          text: '0113-能源、智能和灵活性如何影响经济',
          link: '/content/English/2024/20240113.md',
        },
        {
          text: '0114-有效加速主义',
          link: '/content/English/2024/20240114.md',
        },
        {
          text: '0115-数字化转型',
          link: '/content/English/2024/20240115.md',
        },
        {
          text: '0116-经济机器的最小结构',
          link: '/content/English/2024/20240116.md',
        },
        {
          text: '0117-经济增长的三个主要动力',
          link: '/content/English/2024/20240117.md',
        },
        {
          text: '0118-债务周期',
          link: '/content/English/2024/20240118.md',
        },
        {
          text: '0119-现代经济体系',
          link: '/content/English/2024/20240119.md',
        },
        {
          text: '0120-技术是通缩通的',
          link: '/content/English/2024/20240120.md',
        },
        {
          text: '0121-软件吞噬世界',
          link: '/content/English/2024/20240121.md',
        },
        {
          text: '0122-六大描述技术通缩的定律',
          link: '/content/English/2024/20240122.md',
        },
        {
          text: '0123-技术的瓶颈',
          link: '/content/English/2024/20240123.md',
        },
        {
          text: '0124-行业发展的拐点',
          link: '/content/English/2024/20240124.md',
        },
        {
          text: '0125-GDP的弊端',
          link: '/content/English/2024/20240125.md',
        },
        {
          text: '0126-经济的价值的核心是什么',
          link: '/content/English/2024/20240126.md',
        },
        {
          text: '0127-过去的经济与现代的经济增长',
          link: '/content/English/2024/20240127.md',
        },
        {
          text: '0128-由消费经济到体验经济',
          link: '/content/English/2024/20240128.md',
        },
        {
          text: '0129-经济如何增长',
          link: '/content/English/2024/20240129.md',
        },
        {
          text: '0130-Metaverse-构造的数字世界',
          link: '/content/English/2024/20240130.md',
        },
        {
          text: '0131-富足-通用计算与通用智能（软件吞噬世界，人工智能吞噬软件！）',
          link: '/content/English/2024/20240131.md',
        },
      ],
    },
    {
      text: '02',
      items: [
        {
          text: '0201--如果我们不控制 AI，AI 就会控制我们',
          link: '/content/English/2024/20240201.md',
        },
        {
          text: '0202-人工智能将会带来什么生活',
          link: '/content/English/2024/20240202.md',
        },
        {
          text: '0203-人类被人或者AI操作',
          link: '/content/English/2024/20240203.md',
        },
        {
          text: '0204-人工智能的降维打击',
          link: '/content/English/2024/20240204.md',
        },
        {
          text: '0205-AI与人类的邂逅',
          link: '/content/English/2024/20240205.md',
        },
        {
          text: '0206-AI获取掌控权',
          link: '/content/English/2024/20240206.md',
        },
        {
          text: '0207-认真思考人工智能',
          link: '/content/English/2024/20240207.md',
        },
        {
          text: '0208-必须升级智能时代的架构',
          link: '/content/English/2024/20240208.md',
        },
          {
              text:'0209-命运的态度',
              link:'/content/English/2024/20240209.md'
          },

          {
              text:'0210-语言模型的进化',
              link:'/content/English/2024/20240209.md'
          },

          {
              text:'0211-ai的三个信念
              link:'/content/English/2024/20240209.md'
          },
          {
              text:'0212-AI的三个信念',
              link:'/content/English/2024/20240209.md'
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
