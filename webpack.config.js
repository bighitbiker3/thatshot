var webpack = require('webpack');

module.exports = {
  entry: [
    // 'webpack/hot/only-dev-server',
    './front/src/index.js'
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'react-hot!babel'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  // devServer: {
  //   contentBase: './dist',
  //   hot: true,
  //   historyApiFallback: true
  // },
  plugins: [
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ]
};
