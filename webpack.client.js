const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { merge } = require('webpack-merge')

const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  entry: path.resolve(__dirname, 'src', 'client.tsx'),
  devServer: {
    historyApiFallback: true,
    port: 8000,
    static: {
      directory: path.join(__dirname, 'dist', 'public'),
    },
    proxy: {
      '/api': `http://localhost:${process.env.PORT ?? '3000'}`,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'client', 'index.html'),
      publicPath: '/',
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['*.js'],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public'),
          to: path.resolve(__dirname, 'dist', 'public'),
        },
      ],
    }),
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist', 'public'),
  },
})
