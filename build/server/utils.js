const path = require('path')

const config = require('../../config')
exports.resolve = function (dir) {
  return path.join(__dirname, '../../', dir)
}

exports.assetsPath = function (_path) {
  // assetsSubDirectory ==> assets目录
  const assetsSubDirectory = config.base.assetsSubDirectory
  return path.posix.join('../static', assetsSubDirectory, _path)
}
