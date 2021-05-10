/**
 * css 替代成 const style = {} 用于jest测试
 * @param {*} param0
 */
const t = require('@babel/types')

module.exports = function ({ types: babelTypes }) {
  console.log('babel-plugin-style-to-empty 执行')
  return {
    name: 'babel-plugin-style-to-empty',
    visitor: {
      ImportDeclaration(path, state) {
        let importFile = path.node.source.value
        if (importFile.indexOf('.less') > -1 || importFile.indexOf('.css') > -1) {
          // 如果引入了 css 替代成 const style = {} 用于jest测试
          const targetAST = t.variableDeclaration('const', [
            t.VariableDeclarator(t.Identifier('style'), t.ObjectExpression([]))
          ])
          path.replaceWith(targetAST)
        }
      }
    }
  }
}
