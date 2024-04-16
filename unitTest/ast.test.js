// 这种测试方法就是判断AST 修改的对不对
it('包含Pomegranate', () => {
  const {ast} = babel.transform(input, {plugins: [plugin]});
  
  const program = ast.program;
  const declaration = program.body[0].declarations[0];
  
  assert.equal(declaration.id.name, 'Pomegranate');// 判断 AST 节点的值
});