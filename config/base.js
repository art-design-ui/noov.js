var path = require('path')

module.exports = {
  title: 'react-ssr',
  projectName: 'ninth-studio-mobile',
  assetsPublicPath: 'http://localhost:8080/', // 设计到热更新的host jsonp客户端的地址
  assetsSubDirectory: 'static',
  assetsRoot: path.resolve(__dirname, '../dist')
}
