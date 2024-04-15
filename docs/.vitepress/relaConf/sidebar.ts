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
            collapsed: true,
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
            text: '2024-02',
            collapsed: true,
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
                    text: '0209-命运的态度',
                    link: '/content/English/2024/20240209.md',
                },

                {
                    text: '0210-语言模型的进化',
                    link: '/content/English/2024/20240210.md',
                },
                {
                    text: '0211-ai的三个信念',
                    link: '/content/English/2024/20240211.md',
                },
                {
                    text: '0212-写作的难度',
                    link: '/content/English/2024/20240212.md',
                },
                {
                    text: '0213-顶尖学习高手的能力',
                    link: '/content/English/2024/20240213.md',
                },
                {
                    text: '0214-sptial-computing',
                    link: '/content/English/2024/20240214.md',
                },
                {
                    text: '0215-learn vim like new  language',
                    link: '/content/English/2024/20240215.md',
                },
                {
                    text: '0216-动机与效果',
                    link: '/content/English/2024/20240216.md',
                },
                {
                    text: '0217-假学习',
                    link: '/content/English/2024/20240217.md',
                },
                {
                    text: '0218-对待疾病',
                    link: '/content/English/2024/20240218.md',
                },
                {
                    text: '0219-中国龙年',
                    link: '/content/English/2024/20240219.md',
                },
                {
                    text: '0220-语音塑造方法',
                    link: '/content/English/2024/20240220.md',
                },
                {
                    text: '0221-节奏和韵律',
                    link: '/content/English/2024/20240221.md',
                },
                {
                    text: '0222-语音的功能',
                    link: '/content/English/2024/20240222.md',
                },
                {
                    text: '0223-糖尿病与高血糖',
                    link: '/content/English/2024/20240223.md',
                },
                {
                    text: '0224-新的知识分类',
                    link: '/content/English/2024/20240224.md',
                },
                {
                    text: '0225-警惕医疗推销',
                    link: '/content/English/2024/20240225.md',
                },
                {
                    text: '0226-单词找不到家',
                    link: '/content/English/2024/20240226.md',
                },
                {
                    text: '0227-重庆旅游攻略',
                    link: '/content/English/2024/20240227.md',
                },
                {
                    text: '0228-网络节点化',
                    link: '/content/English/2024/20240228.md',
                },
                {
                    text: '0229-编程的基础概念',
                    link: '/content/English/2024/20240229.md',
                },

            ],
        },
        {
            text:'2024-03',
            collapsed:true,
            items:[
                {
                    text:'0301-indigo的最新访谈感想',
                    link:'/content/English/2024/20240301.md',
                },
                {
                    text:'0302-伪专家',
                    link:'/content/English/2024/20240302.md',
                },
                {
                    text:'0303-提升自信力',
                    link:'/content/English/2024/20240303.md',
                },
                {
                    text:'0304-真正的专家',
                    link:'/content/English/2024/20240304.md',
                },
                {
                    text:'0305-创作是零门槛',
                    link:'/content/English/2024/20240305.md',
                },

                {
                    text:'0306-你的听众在哪里',
                    link:'/content/English/2024/20240306.md',
                },

                {
                    text:'0307-究竟写什么',
                    link:'/content/English/2024/20240307.md',
                },

                {
                    text:'0308-创作快速入门的方法',
                    link:'/content/English/2024/20240308.md',
                },

                {
                    text:'0309-why的创作难度',
                    link:'/content/English/2024/20240309.md',
                },

                {
                    text:'0310-逻辑差的人干啥都不行',
                    link:'/content/English/2024/20240310.md',
                },

                {
                    text:'0311-how写作的方法论',
                    link:'/content/English/2024/20240311.md',
                },
                {
                    text:'0312-格式化创作',
                    link:'/content/English/2024/20240312.md',
                },

                {
                    text:'0313-how的升级版',
                    link:'/content/English/2024/20240313.md',
                },

                {
                    text:'0314-学习英语的另一层意义',
                    link:'/content/English/2024/20240314.md',
                },

                {
                    text:'0315-元素之间的逻辑关系',
                    link:'/content/English/2024/20240315.md',
                },
        
                {
                    text:'0316-逻辑模板之并列关系',
                    link:'/content/English/2024/20240316.md',
                },

                {
                    text:'0317-如何验证你思考丰富',
                    link:'/content/English/2024/20240317.md',
                },

                {
                    text:'0318-如何验证你思考深入',
                    link:'/content/English/2024/20240318.md',
                },

                {
                    text:'0319-三种常见的逻辑关系',
                    link:'/content/English/2024/20240319.md',
                },
                {
                    text:'0320-转折关系',
                    link:'/content/English/2024/20240320.md',
                },
                {
                    text:'0321-三种有力模式',
                    link:'/content/English/2024/20240321.md',
                },
                {
                    text:'0322-什么是好内容',
                    link:'/content/English/2024/20240322.md',
                },

                {
                    text:'0323-修辞的作用',
                    link:'/content/English/2024/20240323.md',
                },
                {
                    text:'0324-重要修辞之具象',
                    link:'/content/English/2024/20240324.md',
                },
                {
                    text:'0325-重要修辞之排比',
                    link:'/content/English/2024/20240325.md',
                },
                {
                    text:'0326-重要修辞之类比',
                    link:'/content/English/2024/20240326.md',
                },
                {
                    text:'0327-重要修辞之隐喻',
                    link:'/content/English/2024/20240327.md',
                },
                {
                    text:'0328-输入为本',
                    link:'/content/English/2024/20240328.md',
                },
                {
                    text:'0329-超级专业',
                    link:'/content/English/2024/20240329.md',
                },
                {
                    text:'0330-猛人的生活',
                    link:'/content/English/2024/20240330.md',
                },
                {
                    text:'0331-输出的目的和目标',
                    link:'/content/English/2024/20240331.md',
                },
            ],
        },
        {
            text: '2024-04',
            collapsed:false,
            items:[
                {
                    text:"0401-销售新解",
                    link:"/content/English/2024/20240401.md",
                },
                
                {
                    text:"0402-如何锻炼表达力",
                    link:"/content/English/2024/20240402.md",
                },
                {
                    text:"0403-做任何事情的秘密",
                    link:"/content/English/2024/20240403.md",
                },
                {
                    text:"0404-创作的目标",
                    link:"/content/English/2024/20240404.md",
                },
                {
                    text:"0405-专业",
                    link:"/content/English/2024/20240405.md",
                },
                {
                    text:"0406-成为教练的核心素质",
                    link:"/content/English/2024/20240406.md",
                },
        
                {
                    text:"0407-论证穿过表象看本质的论据",
                    link:"/content/English/2024/20240407.md",
                },
                {
                    text:"0408-系统",
                    link:"/content/English/2024/20240408.md",
                },
                {
                    text:"0409-速成",
                    link:"/content/English/2024/20240409.md",
                },
                {
                    text:"0410-速成的隐秘的变种",
                    link:"/content/English/2024/20240410.md",
                },

                {
                    text:"0411-社会的影响",
                    link:"/content/English/2024/20240411.md",
                },
                {
                    text:"0412-拆解能力",
                    link:"/content/English/2024/20240412.md",
                },
                {
                    text:"0413-简单与复杂",
                    link:"/content/English/2024/20240413.md",
                },
                {
                    text:"0414-生产的好处",
                    link:"/content/English/2024/20240414.md",
                },
                {
                    text:"0415-生产为导向的隐秘的好处",
                    link:"/content/English/2024/20240415.md",
                },
                {
                    text:"0416-拆分工作",
                    link:"/content/English/2024/20240416.md",
                },
                {
                    text:"0417-提问的逻辑模板",
                    link:"/content/English/2024/20240417.md",
                },
                {
                    text:"0418-管理工作的精髓",
                    link:"/content/English/2024/20240418.md",
                },
                {
                    text:"0419-为什么教育要注重过程的监督",
                    link:"/content/English/2024/20240419.md",
                },
                {
                    text:"0420-监督工作的核心",
                    link:"/content/English/2024/20240420.md",
                },
                {
                    text:"0421-为什么只有少数人才能成事",
                    link:"/content/English/2024/20240421.md",
                },
                {
                    text:"0422-雷军分享",
                    link:"/content/English/2024/20240422.md",
                },
                {
                    text:"0423-区块链世界的生存法则",
                    link:"/content/English/2024/20240423.md",
                },
                {
                    text:"0424-当今社会最重要的能力",
                    link:"/content/English/2024/20240424.md",
                },
                {
                    text:"0425-我们是有历史的社群",
                    link:"/content/English/2024/20240425.md",
                },
                {
                    text:"0426-贫富差距的判断标准",
                    link:"/content/English/2024/20240426.md",
                },
                {
                    text:"0427-如何修复自己的情绪",
                    link:"/content/English/2024/20240427.md",
                },
                {
                    text:"0428-长期主义是人生的一面镜子",
                    link:"/content/English/2024/20240428.md",
                },
                {
                    text:"0429-改变思考及改变命运",
                    link:"/content/English/2024/20240429.md",
                },
                {
                    text:"0430-一个人最好的修行",
                    link:"/content/English/2024/20240430.md",
                },
            ],
            ],
        },
        {
            text: 'topic',
            collapsed: true,
            items: [
            ],
        },
        {
            text: 'topic',
            collapsed: true,
            items: [
                {
                    text: '100-annimal-word',
                    link: '/content/English/2024/animals.md',
                },

                {
                    text: 'atomic-habits',
                    link: '/content/English/2024/Atommic_habits.md',
                },

                {
                    text: 'Apache Ray',
                    link: '/content/English/2024/apache-ray.md',
                },
                {
                    text: 'Story Rober Mackee',
                    link: '/content/English/2024/story_rober_mackee.md',
                },
                {
                    text: 'The Legend of Unix',
                    link: '/content/English/2024/the-legend-of-unix.md',
                },
                {
                    text: 'The Music Theory',
                    link: '/content/English/2024/music-theory.md',
                },
            ],
        },
    ],
    'content/writing':[
        {
            text: 'homework',
            items: [
                { text: '01', link: '/content/writing/homework/01.md'},
                { text: '02', link: '/content/writing/homework/02.md'},
                { text: '03', link: '/content/writing/homework/03.md'},
                { text: '04', link: '/content/writing/homework/04.md'},
                { text: '05', link: '/content/writing/homework/05.md'},
                { text: '06', link: '/content/writing/homework/06.md'},
                { text: '07', link: '/content/writing/homework/07.md'},
                { text: '08', link: '/content/writing/homework/08.md'},
            ],
        },

    ],
    'guide/javascript/': [
        {
            text: 'Javascript',
            items: [
                { text: 'Promise', link: '/guide/javascript/001_basic' },
                { text: 'fetch', link: '/guide/javascript/002_fetch' },
                { text: 'modules', link: '/guide/javascript/003_modules' } 
            ],

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
