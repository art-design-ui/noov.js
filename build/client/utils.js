const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const theme = path.join(__dirname, '../../src/client/style/antd.override.theme.less')

const config = require('../../config')

exports.resolve = function(dir) {
  return path.join(__dirname, '../../', dir)
}

exports.assetsPath = function(_path) {
  const assetsSubDirectory = config.base.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.styleLoaders = function(options) {
  const baseLoaders = [
    options.extract ? MiniCssExtractPlugin.loader : 'style-loader',
    {
      loader: 'css-loader',
      // options: {
      //   modules: true,
      //   localIdentName: '[path]-[local]-[hash:base64:5]'
      // }
    },
    { loader: 'postcss-loader' }
  ]

  const output = []
  output.push({
    test: /\.(css|less)$/,
    exclude: /node_modules/,
    use: [
      ...baseLoaders,
      {
        loader: 'less-loader'
      }
    ]
  })

  output.push({
    test: /\.less$/,
    include: /node_modules\/antd/,
    use: [
      options.extract ? MiniCssExtractPlugin.loader : 'style-loader',
      {
        loader: 'css-loader'
      },
      { loader: 'postcss-loader' },
      {
        loader: 'less-loader',
        options: {
          modifyconsts: {
            hack: `true; @import "${theme}";` // Override with less file
          },
          javascriptEnabled: true
        }
      }
    ]
  })

  output.push({
    test: /\.css$/,
    include: /node_modules/,
    use: [
      options.extract ? MiniCssExtractPlugin.loader : 'style-loader',
      { loader: 'css-loader' }
    ]
  })

  return output
}
