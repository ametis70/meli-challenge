const path = require('path')
const { merge } = require('webpack-merge')

const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'development',
  target: 'node',
  entry: path.resolve(__dirname, 'src', 'server.ts'),
})
