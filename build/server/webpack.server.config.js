// webpack/webpack.dev.config.js
//webpack 配置文件
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const webpack = require('webpack')
const resolvePath = pathstr => path.resolve(__dirname, pathstr)
var utils = require('../client/utils')

//构建前清理目录
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
process.env.BABEL_ENV = 'node' // 设置 babel 的运行环境
const proConfig = require('../../config/pro-config')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  mode: process.env.NODE_ENV,
  target: 'node',
  entry: resolvePath('../../src/server/app/index.ts'), //入口文件
  output: {
    filename: 'app.js',
    path: resolvePath('../../dist/server')
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.(le|c)ss$/,
        use: [
          'isomorphic-style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.ts|\.tsx/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /.(png|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            emitFile: false,
            name: isProd ? 'img/[name].[hash:8].[ext]' : 'img/[name].[ext]',
            publicPath: isProd ? '/' : `http://${__LOCAL_IP__}:${proConfig.wdsPort}`
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({ NODE_ENV: `${process.env.NODE_ENV}` }),
      __IS_PROD__: isProd,
      __SERVER__: true
    })
  ],
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json'],
    alias: {
      //定义dist 目录别名，方便导入模块
      '@dist': path.resolve(__dirname, '../dist'),
      '@': utils.resolve('src/client'),
      '@store': utils.resolve('src/client/store'),
      '@library': utils.resolve('src/client/library'),
      '@modules': utils.resolve('src/client/modules'),
      '@style': utils.resolve('src/client/style'),
      '@components': utils.resolve('src/client/components')
    }
  }
}
