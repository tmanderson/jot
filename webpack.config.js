var path = require('path')
var fs = require('fs')
var babelConfig = JSON.parse(fs.readFileSync('./.babelrc'))

module.exports = {
  // context: __dirname + '/src',
  devtool: '#source-map',
  entry: './src/index.js',
  output: './src/bundle.js',
  module: {
    loaders: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          "presets": ["es2015", "react"],
          "plugins": ["transform-class-properties"]
        }
      },
      {
        test: /.scss$/,
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname, 'assets/styles'),
          path.resolve(__dirname, 'src')
        ],
        loaders: ['style', 'css', 'sass']
      }
    ]
  },
  sassLoader: {
    includePaths: [ `${__dirname}/assets/styles` ]
  }
}
