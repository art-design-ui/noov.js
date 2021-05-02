import Koa from 'koa'
import koaStatic from 'koa-static'
import proxy from 'koa2-proxy-middleware'
import ssrMiddleware from '../middlewares/ssr'
import proConfig from '../../../config/pro-config'

const port = proConfig.nodeServerPort || process.env.PORT

const app = new Koa()
// 引入代理模块
const options = {
  targets: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '/__hmr': {
      target: 'http://localhost:8080',
      changeOrigin: true
    }
  }
}
// 设置资源缓存-开发环境我们暂时不做缓存，为了热更新
console.log('process.env.NODE_ENV', process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
  app.use(async (ctx, next) => {
    await next()
    ctx.set('Cache-Control', 'no-store')
  })
}

app.use(proxy(options))

// 设置可访问的静态资源
app.use(koaStatic('./dist/static'))

// ssr 中间件
app.use(ssrMiddleware)

// 启动服务
app.listen(port)

console.log('server is start .', `http://localhost:${port}`)
