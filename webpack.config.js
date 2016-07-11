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
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules|lib/,
        loader: 'babel-loader'
      },
      {
        test: /\.woff(2?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      },
      {
        test: /\.png/,
        loader: 'url-loader?limit=10000&mimetype=image/png'
      }
    ]
  },
  sassLoader: {
    includePaths: [ `${__dirname}/assets/styles` ]
  }
}
