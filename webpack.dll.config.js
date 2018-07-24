const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackVersionPlugin = require('webpack-version-plugin');

module.exports = {
  entry: {
    react: ['react', 'react-dom', 'react-redux'] // react模块打包到一个动态连接库
  },
  output: {
    path: path.resolve(__dirname, 'vendor/'), 
    filename: '[name].dll.js', // 输出动态连接库的文件名称  
    library: '_dll_[name]_[hash]' // 全局变量名称
  },
  devtool: '#source-map',
  plugins: [
    new webpack.DllPlugin({
      context: __dirname,
      name: '_dll_[name]_[hash]', // 和output.library中一致，也就是输出的manifest.json中的 name值
      path: path.join(__dirname, 'vendor', '[name].manifest.json') // [name].manifest.json 的文件，这个文件是用来让 DLLReferencePlugin 映射到相关的依赖上去的
    }),
    new CleanWebpackPlugin(['vendor'], { root: path.resolve() }), // 清空文件
    new WebpackVersionPlugin({
      cb: (hashMap) => {
        console.log(hashMap);
      }
    })
  ]
};
