

# 一秒超神：Deepseek + 这两个免费工具！提前感受 AGI 逼近

# Deepseek配合这个工具，神了！

**还在用 AI 写文章，提问聊天？**

想象下面场景

- • 让 AI 自动打开浏览器写邮件发送？
- • 查找删除电脑里的重复文件？
- • 抓取并翻译网页，生成双语对照文档？
- • 读本地Obsidian笔记，改写为小红书、X风格发布？

并非天方夜谭、痴人说梦。

**其实很简单，用下面工具，立马实现：**
VS code + Cline插件 + Deepseek API（或其他）

## 截图示意（部分）

**AI 写邮件发送**

- 

```
让AI写邮件，真的理解懂你意思，开始写，调用浏览器发送。。。
```

![Image](assets/640-20250225153633149)

![Image](assets/640-20250225153633017)

**AI查电脑重复文件**

![Image](https://mmbiz.qpic.cn/mmbiz_png/jibL99tg2bCU22PzXuQF0TZQYBysqcn3GDDibNg5dtCDlA4ia3r7N4BxiczP0jZFVTX9GNcsQbo5zgYICyRzoMec6Q/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

**读取本地 Obsidian 文件并总结**

![Image](assets/640-20250225153633095)

**AI 对话安排Todo**

![Image](assets/640-20250225153633158)



## VS code

VS code是微软出品的开源代码编辑器

https://code.visualstudio.com/

![Image](assets/640)

目前最火的AI编程工具都是基于它二次开发，比如Cursor、Windsurf、Trae等。

如不想花钱订阅上面的编程工具，或想灵活自定义。

强烈推荐VS code上的Cline插件。

## Cline

Cline是目前最好用的AI编程工具之一，在Open Router的日排行、周排行和月排行中，Cline都是调用模型最多的工具。

它支持Ollama本地部署的模型，也支持云端主流大模型和 OpenAI 兼容协议，所以无论硅基流动、火山引擎，还是自己中转的LLM API都能调用。

下载安装VS Code后，点击左侧积木一样的插件图标，输入Cline搜索安装。

![Image](assets/640-20250225153633127)

## Deepseek

如果觉得 Deepseek官网的API不稳定，可用火山引擎、硅基流动、Openrouter、TogetherAI等国内外三方Host API。

火山引擎最近搞活动，注册送几十万Token，可填我的邀请码3CT2B6KQ，或复制下面链接注册。

https://www.volcengine.com/experience/ark?utm_term=202502dsinvite&ac=DSASUQY5&rc=3CT2B6KQ

不过火山引擎配置稍微有点麻烦，我尽量提供直达地址和截图说明。

1. 申请火山引擎的API： 在线推理→创建推理接入点，创建API key和模型ID。

https://console.volcengine.com/ark/region:ark+cn-beijing/endpoint

![Image](assets/640-20250225153633018)



2. 复制以下信息：Base URL、Model ID、 和创建好的API Key，注意：Base URL不要v3之后部分

![Image](assets/640-20250225153633182)

3. 打开Cline插件，填写上面获取的信息

![Image](assets/640-20250225153633148)

## 加插件，更强大

大模型虽然很强大，但如果不联网或没有外部数据，实用性就下降很多。

**比如你问大模型今天北京天气，它是回答不了的。**



为了给LLM装上外部大脑和工具

Anthropic 公司推出一套叫MCP的协议，简单粗暴理解：LLM 调用、安装插件的规范。

最近发展极快，所有AI编程模型都在大力推广。



昨天发现一个专门提供MCP服务的网站，只需要复制安装命令就可以。

https://smithery.ai/

![Image](assets/640-20250225153633249)

一秒给LLM加上网页搜索，数据库操作，本地文件编辑等能力。

 

另外是一个Github库：**Awesome MCP Server**

https://github.com/appcypher/awesome-mcp-servers?tab=readme-ov-file

![Image](assets/640-20250225153633285)

常见的插件全都有，对个人来说，搜索和笔记类MCP都很实用。

**最后**

强烈推荐这套工具和玩法，体验后有什么有趣应用场景，欢迎留言交流。