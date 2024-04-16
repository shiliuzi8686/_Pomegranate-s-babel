// 这种测试方法是每次测试记录下快照，后面之前的对比下：
it('works', () => {
  const {code} = babel.transform(input, {plugins: [plugin]});
  
  expect(code).toMatchSnapshot();
});