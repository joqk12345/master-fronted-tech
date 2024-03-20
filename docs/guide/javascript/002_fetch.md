# Fetch API

[[toc]]



## 1. 为什么会出现fetchAPI 

`fetch` 函数是由浏览器提供的用于发起网络请求的现代 API。它的出现主要有以下几个原因：

1. **简洁性：** `fetch` API 提供了一种更简洁和现代的方式来发起网络请求，相比于传统的 XMLHttpRequest（XHR）对象，`fetch` API 更加易于使用和理解。

2. **Promise 风格：** `fetch` API 基于 Promise，这意味着它使用起来更符合现代 JavaScript 异步编程的标准，可以更方便地与 `async/await` 一起使用，使异步代码更加清晰和易于管理。

3. **原生支持跨域请求：** 在默认情况下，`fetch` API 允许跨域请求，不需要额外的设置。这使得在客户端进行跨域请求变得更加简单。

4. **更强大的功能：** `fetch` API 提供了丰富的功能，包括对请求和响应头的控制、流式传输、取消请求等功能，使得开发者能够更灵活地处理网络请求。

总的来说，`fetch` API 的出现是为了提供一种现代、简洁且易于使用的方式来处理网络请求，使得在浏览器中进行网络通信变得更加方便和高效。

## 2. 一个执行例子

### code editor setup
TSC is itself a command-line application written in TypeScript, which means you need NodeJS to run it.

1. 创建目录

```
mkdir chapter-2
ch chapter-2
```

2. 初始化NPM项目

```
npm init
```

3. 初始化TSC、TSLint and type declarations for NodeJS

```
npm install --save-dev typescript tslint @types/node
```
4. 创建tsconfig.json

This tsconfig.json is where TypeScript projects define things like which files should be compiled, which directory to compile them to, and which version of JavaScript to emit.


```
{
 "compilerOptions": {
 "lib": ["es2015"],
 "module": "commonjs",
 "outDir": "dist",
 "sourceMap": true,
 "strict": true,
 "target": "es2015"
 },
 "include": [
 "src"
 ]
}
```

5. 生成tslint.json文件

tslint.json file containing your TSLint configuration, codifying whatever stylistic conventions you want for your code

执行命令如下

```
./node_modules/.bin/tslint --init
```

tslinkt.js脚本内容如下。

```
{
 "defaultSeverity": "error",
 "extends": [
 "tslint:recommended"
 ],
 "rules": {
 "semicolon": false,
 "trailing-comma": false
 }
}
```

6. 创建index.ts文件
创建index.ts文件
```
mkdir src
touch src/index.ts
```
index.ts的内容
```
console.log('Hello TypeScript!')
```

7. 执行编译

```
# Compile your TypeScript with TSC
./node_modules/.bin/tsc
```

8. 执行代码

```
# Run your code with NodeJS
node ./dist/index.js
```

## reference

1. [阮一峰](https://www.ruanyifeng.com/blog/2020/12/fetch-tutorial.html)
2. [introduction to fetch](https://web.dev/articles/introduction-to-fetch)
3. [node-fetch](https://github.com/node-fetch/node-fetch)
4. [Javascript Fetch API: The XMLHttpRequest evolution ](https://developerhowto.com/2019/09/14/javascript-fetch-api/)
