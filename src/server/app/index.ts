import Koa from 'koa'
import koaStatic from '../middlewares/koa-static'
import proxy from 'koa2-proxy-middleware'
import ssrMiddleware from '../middlewares/ssr'
import proConfig from '../../../config/pro-config'
import path from 'path'
import getIp from '../utils/get-ip'

const port = proConfig.nodeServerPort || process.env.PORT

const IP = getIp()
const app = new Koa()

console.log('process.env.NODE_ENV==>', process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
  // 引入代理模块
  const options = {
    targets: {
      '/__hmr': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  }
  app.use(async (ctx, next) => {
    await next()
    // 设置资源缓存-开发环境我们暂时不做缓存，为了热更新
    ctx.set('Cache-Control', 'no-store')
  })
  app.use(proxy(options))
}

app.use(koaStatic(path.join(__dirname, '../static'), { prefix: '/static' }))

// ssr 中间件
app.use(ssrMiddleware)

// 启动服务
app.listen(port, () => {
  console.log('server is start .', `http://${IP}:${port}`)
})
