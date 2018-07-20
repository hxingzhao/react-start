const path = require('path');
const webpack = require('webpack');
const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'src');
const BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  mode: 'development',
  entry: ['./src/app.jsx', 'react-hot-loader/patch'],
  devServer: {
    // 以下配置告知 webpack-dev-server，在 localhost:3000 下建立服务，将 dist 目录下的文件，作为可访问文件。
    publicPath: '/',  // 默认 publicPath 是 "/"，所以你的包(bundle)可以通过 http://localhost:3000/bundle.js 访问。
    contentBase: BUILD_PATH,
    open: true,
    openPage: '', // 指定在打开浏览器时导航到的页面。
    hot: true, // 热更新
    port: 3000,
    host: "localhost", // 如果你希望服务器外部可访问
    compress: true, // 开发服务器是否启动gzip等压缩
    inline: true, // 应用程序启用内联模式(inline mode)。这意味着一段处理实时重载的脚本被插入到你的包(bundle)中
    quiet: false, // 启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见。
    proxy: {}// proxy URLs to backend development server
},
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  watch: true, // 这意味着在初始构建之后，webpack 将继续监听任何已解析文件的更改。Watch 模式默认关闭。
  watchOptions: {
      ignored: /node_modules/, // 忽略不用监听变更的目录，监听大量文件系统会导致大量的 CPU 或内存占用。
      aggregateTimeout: 500, // 防止重复保存频繁重新编译,500毫米内重复保存不打包
      poll: 1000 // 多少毫秒检查一次变动 指定毫秒为单位进行轮询
  }
};
