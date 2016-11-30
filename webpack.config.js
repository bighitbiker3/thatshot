'use strict'

const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const precss = require('precss')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const indexPath = path.join(__dirname, './server', 'app', 'views', 'index.html')

module.exports = {
  devtool: 'eval',
  entry: [
    // 'babel-polyfill',
    // 'webpack-hot-middleware/client',
    'whatwg-fetch',
    './front/src/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.scss'],
    modulesDirectories: ['front', 'node_modules']
  },
  module: {
    preloaders: [
      {
        test: /\.jsx?$/,
        loaders: ['eslint']
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /(node_modules)|(bower_components)/
      },
      {
        test: /\.s?css$/,
        loader: ExtractTextPlugin.extract('style', 'css?-autoprefixer!postcss!sass?sourceMap'),
        include: /(browser)|(node_modules)/
      }
    ]
  },
  postcss: function () {
    return [autoprefixer, precss]
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   inject: true,
    //   template: indexPath
    // }),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('style.css', { allChunks: true })
  ]
}







// var webpack = require('webpack')

// module.exports = {
//   entry: [
//     // 'webpack/hot/only-dev-server',
//     './front/src/index.js'
//   ],
//   module: {
//     loaders: [{
//       test: /\.jsx?$/,
//       exclude: /node_modules/,
//       loader: 'react-hot!babel'
//     }]
//   },
//   resolve: {
//     extensions: ['', '.js', '.jsx']
//   },
//   output: {
//     path: __dirname + '/dist',
//     publicPath: '/',
//     filename: 'bundle.js'
//   },
//   devtool: 'source-map',
//   // devServer: {
//   //   contentBase: './dist',
//   //   hot: true,
//   //   historyApiFallback: true
//   // },
//   plugins: [
//     new webpack.ProvidePlugin({
//       'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
//     })
//   ]
// }


