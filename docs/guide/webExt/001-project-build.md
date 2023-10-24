# 构建多页面应用程序

多页面应用（MPA）和单页面应用（SPA）是两种不同的方式来构建Web应用程序。你应该选择哪种方式取决于你的项目需求和特定的情况。以下是一些情况，适合使用多页面应用：

1. **SEO（搜索引擎优化）需求**：如果你的应用程序需要在搜索引擎中具有很好的可见性，MPA 可能更适合。搜索引擎通常更容易索引和理解多个HTML页面，而不是单个SPA。虽然有方法可以实现SPA的SEO，但MPA通常更加直观。

2. **复杂性较低**：对于简单的项目，可能不需要 SPA 的额外复杂性。MPA 可能更容易开发和维护，因为每个页面都是独立的，不需要处理客户端路由等。

3. **性能**：在某些情况下，MPA 可能更适合具有更好性能需求的应用。SPA 通常需要一次性加载所有 JavaScript 代码，可能会导致较大的初始加载时间。而 MPA 可以按需加载各个页面的资源，降低了初始加载时间。

4. **独立的内容**：如果每个页面都包含不相关的内容，那么 MPA 可能更有意义。SPA 通常适用于应用程序中不同视图之间有共享状态和数据的情况。

5. **不需要现代前端框架**：SPA 通常使用现代前端框架（如React、Vue、Angular）来管理视图和状态。如果你的团队不具备相关技能，或者项目规模不需要框架的特性，MPA 可能更简单。

需要注意的是，SPA 通常更适合交互性较高的应用，因为它们可以实现无缝的前端路由和动态加载。另外，一些应用程序也采用混合的方式，即某些部分是SPA，而其他部分是MPA，以满足不同的需求。

最终，选择使用 MPA 还是 SPA 取决于你的具体项目需求和技术栈，以及你的团队的技能水平。


## 为什么要用vite
## vite项目构建
1. 跟路径与页面加载路径
2. 类似tomcat上面的路径
## 项目构建
1. 

``` javascript
yarn create vite

npm i
npm run dev
```

```

➜  my-test yarn create vite
yarn create v1.22.19
warning package.json: No license field
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
[4/4] 🔨  Building fresh packages...

success Installed "create-vite@4.4.1" with binaries:
      - create-vite
      - cva
✔ Project name: … anything-to-audio-crx-ts
✔ Select a framework: › Vue
✔ Select a variant: › TypeScript

Scaffolding project in /Users/kai.qiao/workspace/fonted/my-test/anything-to-audio-crx-ts...

Done. Now run:

  cd anything-to-audio-crx-ts
  yarn
  yarn dev
```


## 增加路由

```
yarn add vue-router@4
```
### 集成Element Plus

```
yarn add element-plus
```
在项目中引入组件库
```
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import en from 'element-plus/dist/locale/en.mjs'
createApp(Options)
  .use(ElementPlus, { locale: en })
  .use(router)
  .mount('#app')

```


[vite构建多页面程序](https://juejin.cn/post/7106707438900314148)