const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin") 
const webpack = require('webpack');
const ROOT_PATH = path.resolve(__dirname);
const env = process.env.NODE_ENV;
const svgDirs = [
    path.resolve(ROOT_PATH, 'src/assets/svg') // 自己私人的 svg 存放目录
];

module.exports = {
    mode: env === 'production' ? 'production' : 'development',
    entry: {
        app: './src/app.jsx',
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
            include: [path.resolve('src')],
            use: ['css-hot-loader', 'style-loader', 'css-loader', 'postcss-loader']
        }, {
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
        }, {
            test: /\.jsx?$/,
            enforce: 'pre',
            use: [
                {
                    loader: 'eslint-loader',
                    options: { fix: true }
                }
            ],
            include: [path.resolve(__dirname, 'src')], // 指定检查的目录
            exclude: /node_modules/
        },
        {
            test: /\.jsx?$/, // 用babel编译jsx和es6
            include: [path.resolve(__dirname, 'src')], // 指定检查的目录
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
                cacheDirectory: true,
                presets: ['react', 'stage-2', ['env', { modules: false }]],
                // modules关闭 Babel 的模块转换功能，保留原本的 ES6 模块化语法
                plugins: ['transform-runtime', 'transform-decorators-legacy', 'react-hot-loader/babel']
            }
        },
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
                'file-loader'
            ]
        },
        {
            test: /\.(woff|woff2|eot|ttf)(\?.*$|$)/,
            use: ['url-loader']
        },
        {
            test: /\.(svg)$/i,
            use: ['svg-sprite-loader'],
            include: svgDirs // 把 svgDirs 路径下的所有 svg 文件交给 svg-sprite-loader 插件处理
        },
        {
            test: /\.(png|jpg|gif)$/,
            use: ['url-loader?limit=8192&name=images/[hash:8].[name].[ext]']
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
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
          }),
    ],
    watch: true, // 这意味着在初始构建之后，webpack 将继续监听任何已解析文件的更改。Watch 模式默认关闭。
    watchOptions: {
        ignored: /node_modules/, // 忽略不用监听变更的目录，监听大量文件系统会导致大量的 CPU 或内存占用。
        aggregateTimeout: 500, // 防止重复保存频繁重新编译,500毫米内重复保存不打包
        poll: 1000 // 每秒检查一次变动 指定毫秒为单位进行轮询
    }
};