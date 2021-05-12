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
    '/__hmr': {
      target: 'http://localhost:8080',
      changeOrigin: true
    }
  }
}
// 设置资源缓存-开发环境我们暂时不做缓存，为了热更新
if (process.env.NODE_ENV === 'development') {
  app.use(async (ctx, next) => {
    await next()
    ctx.set('Cache-Control', 'no-store')
  })
  app.use(proxy(options))
}

app.use(koaStatic('./dist/static'))

// ssr 中间件
app.use(ssrMiddleware)

// 启动服务
app.listen(port, () => {
  console.log('server is start .', `http://localhost:${port}`)
})
