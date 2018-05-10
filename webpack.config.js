const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    entry: {
        app: './src/index.js',
        print: './src/print.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    // 每个模块相互分离，并用模块名称进行注释。你会看到转译之前的代码，正如编写它时。这取决于 loader 支持。
    devtool: 'inline-source-map',
    // 提供了一个简单的 web 服务器，并且能够实时重新加载(live reloading)
    devServer: {
        // 以上配置告知 webpack-dev-server，在 localhost:8080 下建立服务，将 dist 目录下的文件，作为可访问文件。
        contentBase: './dist'
    },
    plugins: [
        // HtmlWebpackPlugin 创建了一个全新的文件，所有的 bundle 会自动添加到 html 中。
        new HtmlWebpackPlugin({
            title: 'Output Management'
        }),
        // 清理 /dist 文件夹
        new CleanWebpackPlugin(['dist'])
    ]
};