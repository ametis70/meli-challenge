const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { merge } = require('webpack-merge')

const common = require('./webpack.common.js')

const commonClient = {
  entry: path.resolve(__dirname, 'src', 'react', 'browser.tsx'),
  plugins: [
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
    path: path.resolve(__dirname, 'dist', 'public'),
  },
}

const developmentConfig = merge(common, commonClient, {
  mode: 'development',
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
      template: path.resolve(
        __dirname,
        'src',
        'react',
        'webpack-dev-server',
        'index.html',
      ),
      publicPath: '/',
    }),
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist', 'public'),
  },
})

const productionConfig = merge(common, commonClient, {
  mode: 'production',
  output: {
    filename: '[contenthash].js',
  },
})

module.exports = (_, args) => {
  switch (args.mode) {
    case 'development':
      return developmentConfig
    case 'production':
      return productionConfig
    default:
      throw new Error('No matching configuration was found!')
  }
}
