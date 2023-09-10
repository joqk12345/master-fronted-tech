# vue3 从入门到精通

## 提效工具

1. Vue.js devtools

### 1. Vue 与 JQuery 的不同

前端编程从 2.0 时代到 3.0 时代的发展

- 从页面为中心到开始注重数据， 简单来说就是从面向页面到面向数据
- 从单向数据设定，到双向数据绑定， 本示例看到的是数据与属性的绑定
- 从基于 dom 的编程，过度到基于 data 编程， 在 dom 编程时代，编程的范式是确定元素在 dom 中的位置，然后修改或者绑定事件，只需要数据驱动了
- 由于前端框架的技术的发展，导致整个前端的开发范式产生了进化

#### 抛一些小问题

- HTML 模板引擎与字符串模板引擎的区别是什么？
- Vue 这种模板框架与 SpringBoot 中的模板引擎，比如（Thymeleaf）的区别又是什么？他们各自的优势和缺点是什么？
- 究竟是什么特性使得 Vue 成为了前端框架？
- 为什么前端现在是现代编程的引领者？

### 1. 属性绑定

1. 使用 vue3 做数据绑定

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="css/style.css" />
    <title>Document</title>
  </head>
  <body>
    <div id="app">
      <section>
        <div class="container">
          <div class="title">
            <img class="logo" :src="data.src" />
            <h1>{{data.title}}</h1>
          </div>
        </div>
      </section>
    </div>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script>
      const { createApp, ref } = Vue
      createApp({
        setup() {
          const data = { src: './images/vue.png', title: 'Vue.js 手牵手' }
          return {
            data,
          }
        },
      }).mount('#app')
    </script>
  </body>
</html>
```

2. 使用 jquery 做数据绑定

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="css/style.css" />
    <title>Document</title>
  </head>
  <body>
    <div id="app">
      <section>
        <div class="container">
          <div class="title">
            <img class="logo" src="" />
            <h1></h1>
          </div>
        </div>
      </section>
    </div>
    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.js"
      integrity="sha512-+k1pnlgt4F1H8L7t3z95o3/KO+o78INEcXTbnoJQ/F2VqDVhWoaiVml/OEHv9HsVgxUaVW+IbiZPUJQfF/YxZw=="
      crossorigin="anonymous"
    ></script>
    <script>
      let data = {
        src: './images/vue.png',
        title: 'Vue.js 手牵手',
      }

      $('.title > h1').text(data.title)
      $('.title > img').attr('src', data.src)
    </script>
  </body>
</html>
```

### 2. 事件绑定

- 增加了事件绑定
- 增加了程序逻辑，if /else

## 参考文件

1. [springboot-template-engines](https://www.baeldung.com/spring-template-engines)
