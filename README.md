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
