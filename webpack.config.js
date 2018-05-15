
const LiveReloadPlugin = require('webpack-livereload-plugin');
const isDev = process.env.NODE_ENV === 'development';
const mode = isDev ? 'development' : 'production';

module.exports = {
  mode
  ,entry: ['@babel/polyfill','./client/main.js']
  ,output: {
    path: __dirname
    ,filename: './public/bundle.js'
  }
  ,devtool: 'source-map'
  ,module: {
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
  }, plugins: isDev ? [new LiveReloadPlugin({ appendScriptTag: true })] : []
};