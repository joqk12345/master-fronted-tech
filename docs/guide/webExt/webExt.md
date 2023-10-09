# webExt



## 现代浏览器的架构

## Chrome Extension的基础
1. Manifest V3概述
2. Manifest V3主要新特性

- Service workers 替代了background pages
- Network request modification 新增了declarativeNetRequestAPI

3. Chrome Extension的组成
浏览器插件(Chrome Extension)的结构(structure)

```
- extension-sample/
    - manifest.json
    - service-worker.js
    - content-script.js
    - scripts/
        - popup.js
    - popup/
        - popup.css
        - popup.html
    - options/
        - options.css
        - options.html
        - options.js
    - icons/
        - 16.png
        - 32.png
        - 48.png
        - 128.png
```
- manifest.json: 插件配置文件
- popup： 独立弹出页面，可以看做是一个小网站
- content-script.js : content script是注入到目标页面中执行的js脚本，可以获取目标页面的Dom并进行修改。但是，content script的JavaScript与目标页面是互相隔离的。也就是说，content script与目标页面的JavaScript不会出现互相污染的问题，同时，也不能调用对方的方法。
- service-worker.js: 没有界面、权限高可以访问所有扩展API，缺点不能使用DomAPI，所以不能直接使用网页内容，可以理解为他就是个后端服务。

4. 他们直接如何一起协作的

- Sending message
  -  content scripts或其他extension pages需要发送或接收来自extension service worker的信息。在这种情况下，任何一方都可以监听另一方发送的信息，并在同一通道上做出响应。扩展可以发送一次性请求，也可以建立长期连接以支持多条信息。

- Stroring data
  - Chrome 浏览器为所有扩展组件提供了专门的存储 API。它包括四个用于特定用例的独立存储区域，以及一个用于跟踪数据更新的事件监听器。例如，当您在弹出窗口中保存更改时，扩展服务工作程序就会以指定的逻辑做出响应。
- Referencing extension resources








## 常见问题
1. background pages 不支持XMLHttpRequest(axios)




## 参考文章
1. [Manifest file format](https://developer.chrome.com/docs/extensions/mv3/manifest/)
2. [跨域网页请求](https://developer.chrome.com/docs/extensions/mv3/network-requests/#interaction-with-csp)