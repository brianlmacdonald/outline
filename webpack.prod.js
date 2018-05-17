const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './client/main.js',
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: ''
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/
        ,exclude: /(node_modules|bower_components)/
        ,loader: 'babel-loader'
      }
      ,{
        test: /\.css$/
        ,use: [{
          loader: 'style-loader'
        }
        ,{
          loader: 'css-loader'
        }]

      }
    ]
  }, plugins: [ 
    new UglifyJsPlugin({sourceMap: true}), 
    new HtmlWebpackPlugin({
      chunksSortMode: 'none',
      template: './client/index.html'
    }) 
  ]
};