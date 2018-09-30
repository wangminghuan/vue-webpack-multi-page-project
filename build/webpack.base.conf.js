var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var glob = require('glob');
var activeProject = require('./activeProject');
if (!activeProject) {
  console.warn("运行中断，请确认输入项目路径是否正确！！")
  return false
}
var entries = utils.getMultiEntry('./src/page/' + activeProject + '/**/*.js');
var chunks = Object.keys(entries);
console.log(chunks);
if (chunks.length == 0) {
  console.warn("运行中断，请确认输入项目路径是否正确！！")
  return false
}
var projectRoot = path.resolve(__dirname, './')
const vuxLoader = require('vux-loader')

var vueLoaderConfig = require('./vue-loader.conf')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})
var webpackConfig = {

  entry: entries,
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production' ?
      config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components')
    }
  },
  module: {

    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[ext]')
        }
      },

    ]
  },
  plugins: [
    /*
    // 提取公共模块
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors', // 公共模块的名称
      chunks: chunks,  // chunks是需要提取的模块
      minChunks: 4 || chunks.length //公共模块被使用的最小次数。比如配置为3，也就是同一个模块只有被3个以外的页面同时引用时才会被提取出来作为common chunks。

    }),*/

  ]
}

if (process.env.NODE_ENV === 'production') {

  webpackConfig.externals = {
    'vue': 'window.Vue'
  };
}

module.exports = vuxLoader.merge(webpackConfig, {
  options: {},
  plugins: ['vux-ui', 'progress-bar', 'duplicate-style']
})
