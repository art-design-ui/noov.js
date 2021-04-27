var webpack = require('webpack')
var {merge} = require('webpack-merge')
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
var FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
// var HtmlWebpackVariablePlugin = require('../deploy/hwp-variable')

var utils = require('./utils')
var baseWebpackConfig = require('./webpack.base.conf')

module.exports = merge(baseWebpackConfig, {
  mode: 'development',

  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },

  entry: {
    main: ['webpack-hot-middleware/client?path=__hmr', './src/client/main/index.tsx']
  },

  module: {
    rules: [...utils.styleLoaders({})]
  },

  // devtool: '#cheap-module-eval-source-map',

  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // new HtmlWebpackVariablePlugin(process.env.VARS ? { map: process.env.VARS } : {}),
    new BundleAnalyzerPlugin.BundleAnalyzerPlugin({
      openAnalyzer: false,
      analyzerPort: 'auto'
    })
  ]
})
