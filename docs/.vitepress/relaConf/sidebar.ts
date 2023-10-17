export * from './sidebar';
import { DefaultTheme } from 'vitepress';

export const sidebar: DefaultTheme.Sidebar = {
  // /column/Algothm/表示对这个文件夹下的所有md文件做侧边栏配置
  '/column/Algorithm/': [
     // 第一部分
    {
      text: '栈和队列',
      items: [
        {
          text: '栈-深拷贝和浅拷贝',
          link: '/column/Algorithm/001_Stack'
        },
        {
          text: '队列-事件循环',
          link: '/column/Algorithm/002_Queue'
        }
      ]
    },
    // 第二部分
    {
      text: '字典和树',
      items: [
        {
          text: '字典和集合-Set和Map',
          link: '/column/Algorithm/003_Dictionary'
        },
        {
          text: '树-深/广度优先遍历',
          link: '/column/Algorithm/004_Tree'
        }
      ]
    }
  ],
  'guide/':[
      {
        text: 'Javascript',
        items: [
          // { text: 'Runtime API Examples', link: '/api-examples' },
          { text: 'Typescript', link: '/guide/typescript/handbook' },
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
    ]
};

