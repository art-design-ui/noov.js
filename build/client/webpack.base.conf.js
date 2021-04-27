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

    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.less$/,
                    chunks: 'all',
                    enforce: true,
                },
                libs: { // 抽离第三方库
                    test: /node_modules/, // 指定是node_modules下的第三方包
                    chunks: 'initial',
                    name: 'libs'// 打包后的文件名，任意命名    
                }
            }
        }
    },
}
