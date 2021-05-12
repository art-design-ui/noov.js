const path = require('path')
const nodeExternals = require('webpack-node-externals')
const webpack = require('webpack')
const resolvePath = pathstr => path.resolve(__dirname, pathstr)
var utils = require('../client/utils')
process.env.BABEL_ENV = 'node' // 设置 babel 的运行环境
const proConfig = require('../../config/pro-config')
const WebpackBar = require('webpackbar')

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
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: isProd
            ? utils.assetsPath('staic/img/[name].[hash:7].[ext]')
            : utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: isProd
            ? utils.assetsPath('static/media/[name].[hash:7].[ext]')
            : utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: isProd
            ? utils.assetsPath('static/fonts/[name].[hash:7].[ext]')
            : utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({ NODE_ENV: `${process.env.NODE_ENV}` }),
      __IS_PROD__: isProd,
      __SERVER__: true,
      __IS_WEBPACK__: true
    }),
    new WebpackBar({
      name: 'server',
      color: 'orange'
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
