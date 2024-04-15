我们经常会打印一些日志来辅助调试，但是有的时候会不知道日志是在哪个地方打印的。希望通过 babel 能够自动在 console.log 等 api 中插入文件名和行列号的参数，方便定位到代码。

也就是把这段代码：
```js

console.log(1);
```

转换为这样：
```js

console.log('文件名（行号，列号）：', 1);
```

注意❗：
@babel/parser 等包都是通过 es module 导出的，所以通过 commonjs 的方式引入有的时候要取 default 属性
