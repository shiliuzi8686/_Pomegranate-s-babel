const { codeFrameColumns } = require('@babel/code-frame');

const code = `
const a = 1;
const b = 2;
const c = 3;
const d = 4;
`

const res = codeFrameColumns(code, {
  start: { line: 2, column: 3 },
  end: { line: 3, column: 5 } 
}, {
  highlightCode: true,
  message: '这里出错了'
})

console.log('res\n', res);