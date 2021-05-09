/**
 * 删除 css 的引入
 * @param {*} param0
 */
module.exports = function ({ types: babelTypes }) {
  console.log('no-require-css 执行')
  return {
    name: 'no-require-css',
    visitor: {
      ImportDeclaration(path, state) {
        let importFile = path.node.source.value
        if (importFile.indexOf('.less') > -1 || importFile.indexOf('.css') > -1) {
          // 如果引入了 css 需要干掉
          path.remove()
        }
      }
    }
  }
}
