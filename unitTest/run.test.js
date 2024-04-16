// 这种测试就是执行下转换后的代码，看执行是否正常：
it('替换baz为foo', () => {
  var input = `
    var foo = 'guang';
    // 把baz重命名为foo
    var res = baz;
  `;
  
  var {code} = babel.transform(input, {plugins: [plugin]});
  
  var f = new Function(`
    ${code};
    return res;
  `);
  var res = f();
  
  assert(res === 'guang', 'res is guang');
});
