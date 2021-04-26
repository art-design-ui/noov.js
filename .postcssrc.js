module.exports = {
  plugins: [
    require('autoprefixer'),
    require('stylelint')({
      configFile: '.stylelintrc'
    })
  ]
}
