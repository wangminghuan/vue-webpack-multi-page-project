require('./check-versions')()

process.env.NODE_ENV = 'production'

var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var fs = require('fs');
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')
var activeProject = require('./activeProject');
var spinner = ora('building for production...')
var stat = fs.stat;
var copyChunks = function (src, dst, complete) {
  //读取目录
  fs.readdir(src, function (err, paths) {
    if (err) {
      throw err;
    }
    paths.forEach(function (path) {
      var _src = src + '/' + path;
      var _dst = dst + '/' + path;
      var readable;
      var writable;
      stat(_src, function (err, st) {
        if (err) {
          throw err;
        }
        if (st.isFile()) {
          readable = fs.createReadStream(_src); //创建读取流
          writable = fs.createWriteStream(_dst); //创建写入流
          readable.pipe(writable);
        } else if (st.isDirectory()) {
          checkChunks(_src, _dst, copyChunks);
        }
        if (path == paths[paths.length - 1]) {
          complete();
        }
      });
    });
  });
}

var checkChunks = function (src, dst, callback, complete) {
  //测试某个路径下文件是否存在
  fs.exists(src, (exists) => {
    if (exists) {
      fs.exists(dst, function (exists) {
        if (exists) { //不存在
          callback(src, dst, complete);
        } else { //存在
          fs.mkdir(dst, function () { //创建目录
            callback(src, dst, complete)
          })
        }
      })
    }
  })
}

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')
    // 拷贝不在打包范围内img
    checkChunks(path.resolve(__dirname, '../src/page/' + activeProject + '/img/copy/'), path.join(config.build.assetsRoot + '/' + activeProject + "/img/"), copyChunks, () => {
      console.log(chalk.yellow('  Tip: move copy files complete.\n'))
    })

    // //移动chunks位置，符合异步模块加载路径
    // checkChunks(path.join(config.build.assetsRoot + "/" + activeProject + "/chunks"), path.join(config.build.assetsRoot + "/chunks/"), copyChunks, () => {
    //   rm((path.join(config.build.assetsRoot + "/" + activeProject)), () => {
    //     console.log(chalk.yellow('  Tip: move chunk files complete.\n'))
    //   })
    // })
    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})