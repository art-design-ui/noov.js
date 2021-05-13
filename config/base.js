var path = require('path')

module.exports = {
  title: 'noov.js',
  projectName: 'static',
  assetsPublicPath: 'http://localhost:8080/', // 涉及到热更新的host jsonp客户端的地址
  assetsSubDirectory: 'assets',
  assetsRoot: path.resolve(__dirname, '../dist')
}
