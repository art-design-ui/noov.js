const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const config = require('../../config')

exports.resolve = function (dir) {
  return path.join(__dirname, '../../', dir)
}

exports.assetsPath = function (_path) {
  const assetsSubDirectory = config.base.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.styleLoaders = function (options) {
  const baseLoaders = [
    {
      loader: 'isomorphic-style-loader'
    },
    {
      loader: 'css-loader'
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
      {
        loader: 'isomorphic-style-loader'
      },
      {
        loader: 'css-loader'
      },
      { loader: 'postcss-loader' },
      {
        loader: 'less-loader',
        options: {
          javascriptEnabled: true
        }
      }
    ]
  })

  output.push({
    test: /\.css$/,
    include: /node_modules/,
    use: [
      options.extract
        ? {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: config.prod.assetsPublicPath
            }
          }
        : 'style-loader',
      { loader: 'css-loader' }
    ]
  })

  return output
}
