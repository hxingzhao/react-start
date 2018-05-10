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
    plugins: [
        // HtmlWebpackPlugin 创建了一个全新的文件，所有的 bundle 会自动添加到 html 中。
        new HtmlWebpackPlugin({
            title: 'Output Management'
        }),
        // 清理 /dist 文件夹
        new CleanWebpackPlugin(['dist'])
    ]
};