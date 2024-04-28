const importModule = require('@babel/helper-module-imports');

module.exports = function autoTrackPlugin(api, options, dirname){
  return {
    visitor: {
      // program根结点遍历ImportDeclaration
      Program: {
        enter(path, state){
          console.log('path', path);
          console.log('state', state);
          path.traverse({
            ImportDeclaration(curPath) {
              console.log('curPath', curPath);
              // 导入的路径（可能是 'vue' 这样的，也可能是 ‘./utils’ 这样的）
              const requirePath = curPath.get('source').node.value;
              console.log('requirePath', requirePath);
              // 如果导入的路径是我们指定的路径 -- ？options从哪来 --> 使用plugin时传入的参数
              if(requirePath === options.trackerPath){
                const specifierPath = curPath.get('specifiers.0')
                console.log('specifierPath', specifierPath);
                if(specifierPath.isImportSpecifier()){
                  state.trackerImportId = specifierPath.toString();
                } else if(specifierPath.isImportNamespaceSpecifier()){
                  state.trackerImportId = specifierPath.get('local').toString();
                }
                path.stop();
              }
            }
          })

          // 没有的话就增加导入tracker的语句
          if(!state.trackerImportId){
            state.trackerImportId = importModule.addDefault(path, 'tracker',{
                nameHint: path.scope.generateUid('tracker')
            }).name; // tracker 模块的 id
            state.trackerAST = api.template.statement(`${state.trackerImportId}()`)()
          }
        }
      },
      'ClassMethod|ArrowFunctionExpression|FunctionExpression|FunctionDeclaration'(path, state) {
        const bodyPath = path.get('body');
        if (bodyPath.isBlockStatement()) { // 有函数体就在开始插入埋点代码
            bodyPath.node.body.unshift(state.trackerAST);
        } else { // 没有函数体要包裹一下，处理下返回值
          console.log('bodyPath.node', bodyPath.node);
          const ast = api.template.statement(`{${state.trackerImportId}();return PREV_BODY;}`)({PREV_BODY: bodyPath.node});
          bodyPath.replaceWith(ast);
        }
      }
    }
  }
}