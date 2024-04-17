# _Pomegranate-s-babel

react、flow、typescript
只是转换 javascript 本身的 es spec 和 proposal 的特性特性并不够，现在我们开发的时候 jsx、typescript、flow 这些都是会用的，babel 肯定也得支持。

这些转换对应的 plugin 分别放在不同 preset 里： preset-jsx、preset-typescript、preset-flow。

我们要转换的范围又大了一些。


流程：
开发中使用ES6、ES7、ES8等新特性 --》 浏览器不支持 --》 babel将新特性转换为ES5 --》 浏览器支持

开发中jsx --》 浏览器不支持 --》 babel将jsx转换为js --》 浏览器支持

开发中typescript --》 浏览器不支持 --》 babel将typescript转换为js --》 浏览器支持

开发中flow --》 浏览器不支持 --》 babel将flow转换为js --》 浏览器支持

> babel怎么支持jsx的转译的，推测是使用的jsx内部的complier，将jsx -》 js,然后再通过babel的转译功能将js转译为目标环境对应的版本


babel helpers 是用于 babel plugin 逻辑复用的一些工具函数，分为用于注入 runtime 代码的 helper 和用于简化 AST 操作 的 helper两种。
第一种都在 @babel/helpers 包里，直接 this.addHelper(name) 就可以引入， 而第二种需要手动引入包和调用 api。
示例：
```js
const importModule = require('@babel/helper-module-imports');
```

babel runtime
`babel runtime 里面放运行时加载的模块`，会被打包工具打包到产物中，下面放着各种需要在 runtime 使用的函数，包括三部分：regenerator、corejs、helper。
> 思考：是不是打包产物打包的就是运行时需要的模块、内容

corejs 这就是新的 api 的 polyfill，分为 2 和 3 两个版本，3 才实现了实例方法的polyfill

regenerator 是 facebook 实现的 aync 的 runtime 库，babel 使用 regenerator-runtime来支持实现 async await 的支持。

helper 是 babel 做语法转换时用到的函数，比如 _typeof、_extends 等

babel 做语法转换和 api 的 polyfill，需要自己实现一部分 runtime 的函数，就是 helper 部分。

有的也没有自己实现，用的第三方的，比如 regenerator 是用的 facebook 的。api 的 polyfill 也是用的 core-js 的，babel 对它们做了整合。

因为 async await 这种特性的实现还是比较复杂的，标准 api 的实现的跟进也需要花精力，所以 babel 直接用了社区的实现。