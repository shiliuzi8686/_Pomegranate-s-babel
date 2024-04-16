const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const types = require('@babel/types');

const logCode = ['log', 'warn', 'dir'].map( logCode => 'console.' + logCode)

const sourceCode = `
  console.log('hello lyt');
`

const ast = parser.parse(sourceCode, {
  sourceType: 'unambiguous'
})

traverse(ast, {
  CallExpression(path, state) {
    const {code} = generate(path.node.callee)
    if (logCode.includes(code)) {
      const newNode = types.stringLiteral(`filename, ${path.node.loc.start.line}, ${path.node.loc.start.column}`)
      path.node.arguments.unshift(newNode)
      console.log('path.node.arguments', path.node.arguments);
    }
  }
})

const { code, map } = generate(ast);

console.log('转换后代码', code);

