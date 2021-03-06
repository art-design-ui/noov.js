const { spawn } = require('child_process') // 用于创建子进程
const constantCode = require('../config/constant')
const chalk = require('chalk') // 为控制台输出的信息增加点色彩
const log = console.log
const os = require('os')

function getIp() {
  const interfaces = os.networkInterfaces()
  for (const name of Object.keys(interfaces)) {
    for (const interface of interfaces[name]) {
      const { address, family, internal } = interface
      if (family === 'IPv4' && !internal) {
        return address
      }
    }
  }
}
const localHostIp = getIp()

log(chalk.green('servers starting....'))

// 前端代码构建 服务进程
const feCodeWatchProcess = spawn('npm', ['run', 'client:dev', localHostIp], {
  stdio: 'inherit',
  shell: process.platform === 'win32'
})

// 服务端代码监控和构建进程
let svrCodeWatchProcess = spawn('npm', ['run', 'server-dev:build'], {
  shell: process.platform === 'win32'
})
// 监听服务端代码构建服务的对外输出  stdout 事件
svrCodeWatchProcess.stdout.on('data', print)

// node 服务进程
let nodeServerProcess = null
// 启动 node 服务
const startNodeServer = () => {
  // 重启 node 服务
  nodeServerProcess && nodeServerProcess.kill()
  nodeServerProcess = spawn('node', ['./build/server/dev-server.js', localHostIp], {
    stdio: 'inherit',
    shell: process.platform === 'win32'
  })
}

// 控制台输出信息
function print(data) {
  let str = data.toString()
  if (str.indexOf(constantCode.SVRCODECOMPLETED) > -1) {
    // 服务端代码编译完成
    console.log('启动服务端')
    startNodeServer() // 重启 node 服务
  } else {
    console.log(str)
  }
}

// 杀掉子进程
const killChild = () => {
  svrCodeWatchProcess && svrCodeWatchProcess.kill()
  nodeServerProcess && nodeServerProcess.kill()
  feCodeWatchProcess && feCodeWatchProcess.kill()
}

// 主进程关闭退出子进程
process.on('close', code => {
  console.log('main process  close', code)
  killChild()
})
// 主进程关闭退出子进程
process.on('exit', code => {
  console.log('main process  exit', code)
  killChild()
})

// 非正常退出情况
process.on('SIGINT', function () {
  svrCodeWatchProcess.stdin.write('exit', error => {
    console.log('svr code watcher process exit!')
  })
  killChild()
})
