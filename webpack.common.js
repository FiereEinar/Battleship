const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  plugins: [new HtmlWebpackPlugin({
    template: './src/template.html',
    // filename: 'main.[hash].html',
  })],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
    ],
  },
};