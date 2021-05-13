const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackBar = require('webpackbar')
const webpack = require('webpack')
const ESLintPlugin = require('eslint-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const utils = require('./utils')
const config = require('../../config')

module.exports = {
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json'],
    alias: {
      '@': utils.resolve('src/client'),
      '@store': utils.resolve('src/client/store'),
      '@library': utils.resolve('src/client/library'),
      '@modules': utils.resolve('src/client/modules'),
      '@style': utils.resolve('src/client/style'),
      '@components': utils.resolve('src/client/components')
    }
  },

  entry: {
    main: './src/client/main/index.tsx'
  },

  output: {
    path: utils.resolve('/dist/static'),
    publicPath: config.base.assetsPublicPath,
    filename: '[name].js',
    chunkFilename: utils.assetsPath('js/[id].[chunkhash]p.js')
  },

  module: {
    rules: [
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
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },

  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new ESLintPlugin({
      fix: true
    }),
    new WebpackBar({
      name: 'client',
      color: 'green'
    }),
    new HtmlWebpackPlugin({
      title: config.base.title,
      filename: 'index.html',
      template: path.resolve(__dirname, '../../templates/index.ejs'),
      inject: true
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({ NODE_ENV: 'development' }),
      __IS_PROD__: false,
      __SERVER__: false,
      __IS_WEBPACK__: true
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        libs: {
          // 抽离第三方库
          test: /node_modules/, // 指定是node_modules下的第三方包
          chunks: 'initial',
          name: 'libs' // 打包后的文件名，任意命名
        }
      }
    }
  }
}
