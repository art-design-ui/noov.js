var os = require('os')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ProgressBarPlugin = require('progress-bar-webpack-plugin')
// var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

var utils = require('./utils')
var config = require('../../config')

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
    app: './src/client/main/index.tsx'
  },

  output: {
    path: config.base.assetsRoot,
    publicPath: config.base.assetsPublicPath,
    filename: utils.assetsPath('js/[name].[hash]p.js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash]p.js')
  },

  module: {
    rules: [
      {
        test: /\.ts|\.tsx/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.ts|\.tsx|\.js|\.json/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true,
          cache: true,
        },
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
    new ProgressBarPlugin(),
    // new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: config.base.title,
      filename: 'index.html',
      template: path.resolve(__dirname, '../../templates/index.ejs'),
      inject: true
    })
  ],

  // optimization: {
  //   // 提取公共资源
  //   // 分离基础库
  //   splitChunks: {
  //     chunks: 'async',
  //     minSize: 30000,
  //     maxSize: 0,
  //     minChunks: 1,
  //     maxAsyncRequests: 5,
  //     maxInitialRequests: 3,
  //     automaticNameDelimiter: '~',
  //     name: true,
  //     cacheGroups: {
  //       vendors: {
  //         test: /[\\/]node_modules[\\/]/,
  //         priority: -10
  //       },
  //       default: {
  //         minChunks: 2,
  //         priority: -20,
  //         reuseExistingChunk: true
  //       }
  //     }
  //   }
  // }
}
