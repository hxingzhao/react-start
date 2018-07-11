const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

function resolve(dir) {
    return path.join(__dirname, '.', dir);
}
module.exports = {
    mode: "development", // "production" | "development" | "none"
    entry: {
        app: './src/index.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    // 每个模块相互分离，并用模块名称进行注释。你会看到转译之前的代码，正如编写它时。这取决于 loader 支持。
    // devtool: 'inline-source-map',
    devtool: 'cheap-module-eval-source-map',
    // 提供了一个简单的 web 服务器，并且能够实时重新加载(live reloading)
    devServer: {
        // 以上配置告知 webpack-dev-server，在 localhost:8080 下建立服务，将 dist 目录下的文件，作为可访问文件。
        contentBase: './dist',
        open: true,
        openPage: '', // 指定在打开浏览器时导航到的页面。
        hot: true, // 热更新
        port: 3000,
        host: "localhost", // 如果你希望服务器外部可访问
        compress: true, // 开发服务器是否启动gzip等压缩
        inline: true, // 应用程序启用内联模式(inline mode)。这意味着一段处理实时重载的脚本被插入到你的包(bundle)中
        proxy: {}// proxy URLs to backend development server
    },
    module: {
        rules: [{
                test: /\.css$/,
                // 借助于 style-loader 的帮助，CSS 的模块热替换实际上是相当简单的。
                // 当更新 CSS 依赖模块时，此 loader 在后台使用 module.hot.accept 来修补(patch) <style> 标签
                use: ['style-loader', 'css-loader']
            },{
                test: /\.scss$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader", options: {
                        sourceMap: true
                    }
                }, {
                    loader: "sass-loader", options: {
                        sourceMap: true
                    }
                }]
            },{
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-env'],
                        // babel 在每个文件都插入了辅助代码，使代码体积过大！
                        // 引入 babel runtime 作为一个独立模块，来避免重复引入。
                        // 安装 babel-plugin-transform-runtime 和 babel-runtime 这两个依赖
                        plugins: ['babel-plugin-transform-runtime'] 
                    }
                }
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    plugins: [
        // HtmlWebpackPlugin 创建了一个全新的文件，所有的 bundle 会自动添加到 html 中。
        new HtmlWebpackPlugin({
            title: 'Output Management'
        }),
        // 清理 /dist 文件夹
        new CleanWebpackPlugin(['dist']),
        // 添加了 NamedModulesPlugin，以便更容易查看要修补(patch)的依赖
        // 当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境。
        new webpack.NamedModulesPlugin(),
        // hot 热更新插件
        new webpack.HotModuleReplacementPlugin(),
        // 忽略掉 d.ts 文件，避免因为编译生成 d.ts 文件导致又重新检查触发重编译。
        // new webpack.WatchIgnorePlugin([/\.js$/, /\.d\.ts$/]) 
    ],
    watch: true, // 这意味着在初始构建之后，webpack 将继续监听任何已解析文件的更改。Watch 模式默认关闭。
    watchOptions: {
      ignored: /node_modules/, // 忽略不用监听变更的目录，监听大量文件系统会导致大量的 CPU 或内存占用。
      aggregateTimeout: 500, // 防止重复保存频繁重新编译,500毫米内重复保存不打包
      poll: 1000 // 每秒检查一次变动 指定毫秒为单位进行轮询
    }
};