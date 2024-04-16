平时我们很少单独使用 babel 的 api，更多是封装成插件，插件可以上传到 npm 仓库来复用

babel plugin 有两种格式：
+ 一个函数返回一个对象的格式
+ 一个对象的格式，不用函数包裹，这种方式用于不需要处理参数的情况。

plugin 是单个转换功能的实现，当 plugin 比较多或者 plugin 的 options 比较多的时候就会导致使用成本升高。这时候可以封装成一个 preset，用户可以通过 preset 来批量引入 plugin 并进行一些配置。preset 就是对 babel 配置的一层封装

学 babel 的内置功能，主要就是学 preset 的配置，比如 preset-env、preset-typescript 等。

preset 格式和 plugin 一样，也是可以是一个对象，或者是一个函数，函数的参数也是一样的 api 和 options，区别只是 preset 返回的是配置对象，包含 plugins、presets 等配置。

diff：
preset 和 plugin 从形式上差不多，但是应用顺序不同。

babel 会按照如下顺序处理插件和 preset：

先应用 plugin，再应用 preset
plugin 从前到后，preset 从后到前
这个顺序是 babel 的规定。



babel plugin、preset 名字的补全有这些规则：
如果是 ./ 开头的相对路径，不添加 babel plugin，比如 ./dir/plugin.js
如果是绝对路径，不添加 babel plugin，比如 /dir/plugin.js
如果是单独的名字 aa，会添加为 babel-plugin-aa，所以插件名字可以简写为 aa
如果是单独的名字 aa，但以 module 开头，则不添加 babel plugin，比如 module:aa
如果 @scope 开头，不包含 plugin，则会添加 babel-plugin，比如 @scope/mod 会变为 @scope/babel-plugin-mod
babel 自己的 @babel 开头的包，会自动添加 plugin，比如 @babel/aa 会变成 @babel/plugin-aa

规则比较多，总结一下就是 babel 希望插件名字中能包含 babel plugin，这样写 plugin 的名字的时候就可以简化，然后 babel 自动去补充。所以我们写的 babel 插件最好是 babel-plugin-xx 和 @scope/babel-plugin-xx 这两种，就可以简单写为 xx 和 @scope/xx。

写 babel 内置的 plugin 和 preset 的时候也可以简化，比如 @babel/preset-env 可以直接写@babel/env，babel 会自动补充为 @babel/preset-env。