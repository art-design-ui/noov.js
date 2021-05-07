const webpack = require('webpack')
const {merge} = require('webpack-merge')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

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
    rules:[
      {
        test: /\.(le|c)ss$/,
        use: [
          'isomorphic-style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader',
          'less-loader'
        ]
      },
    ]
  },
  devtool: 'cheap-source-map',
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(), 
    new BundleAnalyzerPlugin.BundleAnalyzerPlugin({
      openAnalyzer: false,
      analyzerPort: 'auto'
    })
  ]
})
