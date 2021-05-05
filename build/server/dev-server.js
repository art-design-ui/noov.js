// 开发环境 node 服务启动入口
const getPort = require('./free-port')
const localIp = process.argv[process.argv.length - 1] // 获得 本机ip 地址
const proConfig = require('../../config/pro-config')

global.__LOCAL__IP__ = localIp

// node server port
const nodeServerPort = proConfig.nodeServerPort

//启动前检查端口是否占用，杀掉占用端口的进程
getPort(nodeServerPort)

require('../../dist/server/app')
