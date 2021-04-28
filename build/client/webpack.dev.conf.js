const webpack = require('webpack')
const {merge} = require('webpack-merge')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
// var HtmlWebpackVariablePlugin = require('../deploy/hwp-variable')

const utils = require('./utils')
const baseWebpackConfig = require('./webpack.base.conf')

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
    // rules: [...utils.styleLoaders({})]
    rules:[
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
    ]
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
