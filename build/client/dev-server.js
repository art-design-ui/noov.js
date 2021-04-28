const path = require('path')
const express = require('express')
const webpack = require('webpack')
const devMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.dev.conf')

const config = require('../../config')
const port = config.dev.port

const getPort = require('get-port')

const main = function() {
  getPort({
    port: getPort.makeRange(port, port + 100)
  }).then(function(newPort) {
    const app = express()
    const compiler = webpack(webpackConfig)

    const webpackDevMiddleware = devMiddleware(compiler, {
      // logLevel: 'silent',
      index:true,
      publicPath: webpackConfig.output.publicPath
    })

    const webpackHotMiddleware = hotMiddleware(compiler, {
      log: false,
      heartbeat: 2000,
      path: '/__hmr'
    })

      //设置跨域访问
      app.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By",' 3.2.1')
        res.header("Content-Type", "application/json;charset=utf-8");
        next();
      });
      

    app.use(webpackDevMiddleware)

    app.use(webpackHotMiddleware)

    app.use('/ping', function(req, res) {
      res.sendStatus(200)
    })


    const staticPath = path.posix.join(config.dev.assetsPublicPath, config.base.assetsSubDirectory)
    app.use(staticPath, express.static('./static'))

    console.log('> Starting dev server...')
    webpackDevMiddleware.waitUntilValid(() => {
      console.log(`> Listening at ${config.dev.host}:${newPort} \n`)
    })
    app.listen(newPort)
  })
}

main()
