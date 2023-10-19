## Promise

promise是一个JavaScript对象，

- promise 代表着面向未来编程，或者说面向承诺编程
- promise 是对异步操作的封装
- promise 表示一个异步操作最终完成
- 异步操作最终完成代表着两层含义即是异步操作本身和对操作绑定的回调函数也执行完成


### JavaScript中的老式回调函数

``` javascipt
// 成功的回调函数
function successCallback(result) {
  console.log("音频文件创建成功：" + result);
}

// 失败的回调函数
function failureCallback(error) {
  console.log("音频文件创建失败：" + error);
}

createAudioFileAsync(audioSettings, successCallback, failureCallback);
```

### 在JavaScript中的新式回调函数
现代版的做法

``` javascript

createAudioFileAsync(audioSettings).then(successCallback, failureCallback);

```

### 这么做的好处


- 链式调用
  - 避免回调地狱（callback hell）
  - 面向未来编程，面向承诺编程更灵活，
  - 翻译成大白话的解释就是我执行了A，加入A1执行成功了我要做A2，执行失败我要做A3, 在A2 成功后我要做B2，在A3成功后我要做B3……
  - 可以保证顺序执行

``` javascript
const promise = doSomething();
const promise2 = promise.then(successCallback, failureCallback);
```

- 链式调用的经典例子

``` javascript
doSomething()
  .then(function (result) {
    return doSomethingElse(result);
  })
  .then(function (newResult) {
    return doThirdThing(newResult);
  })
  .then(function (finalResult) {
    console.log(`Got the final result: ${finalResult}`);
  })
  .catch(failureCallback);
```

也可以换一种写法

``` javascript

doSomething()
  .then((result) => doSomethingElse(result))
  .then((newResult) => doThirdThing(newResult))
  .then((finalResult) => {
    console.log(`Got the final result: ${finalResult}`);
  })
  .catch(failureCallback);

```
- 目前看到的是单链的处理



## 参考文件

[MSDN Promise](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)


