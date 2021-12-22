const path = require('path')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  entry: path.resolve(__dirname, 'src', 'client.tsx'),
  devServer: {
    historyApiFallback: true,
    port: 8000,
    proxy: {
      '/api': `http://localhost:${process.env.PORT ?? '3000'}`,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'client', 'index.html'),
    }),
  ],
})
