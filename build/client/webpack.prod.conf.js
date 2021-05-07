const os = require('os')
const path = require('path')
const merge = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// js默认开启压缩
// css压缩插件
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const utils = require('./utils')
const config = require('../../config')
const baseWebpackConfig = require('./webpack.base.conf')

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  module: {
    rules: [
      ...utils.styleLoaders({
        extract: true
      })
    ]
  },
  devtool: 'source-map',
  output: {
    publicPath: `${config.prod.assetsPublicPath}/${config.base.projectName}/`
  },

  plugins: [
    new MiniCssExtractPlugin({
      path: config.base.assetsRoot,
      publicPath: config.prod.assetsPublicPath,
      filename: utils.assetsPath('css/[name].[hash]p.css'),
      chunkFilename: utils.assetsPath('css/[id].[chunkhash]p.css')
    })
  ],

  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          map: {
            inline: false
          }
        }
      }),
      new TerserPlugin({
        sourceMap: true,
        terserOptions: {
          compress: {
            drop_console: true
          }
        }
      }),
      new CompressionWebpackPlugin({
        compressionOptions: {
          numiterations: 15
        },
        algorithm: 'gzip'
      })
    ]
  }
})
