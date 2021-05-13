const os = require('os')
const path = require('path')
const { merge } = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// js默认开启压缩
// css压缩插件
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const utils = require('./utils')
const config = require('../../config')
const baseWebpackConfig = require('./webpack.base.conf')
//生成 manifest 方便定位对应的资源文件
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')

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
    filename: '[name].[contenthash].js',
    publicPath: `${config.prod.assetsPublicPath}/${config.base.projectName}/`
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[hash]p.css'),
      chunkFilename: utils.assetsPath('css/[id].[chunkhash]p.css')
    }),
    //生成 manifest 方便定位对应的资源文件
    new WebpackManifestPlugin({
      fileName: '../server/asset-manifest.json'
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
        parallel: true,
        compress: {
          drop_console: true,
          drop_debugger: false,
          pure_funcs: ['console.log'] // 移除console
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
