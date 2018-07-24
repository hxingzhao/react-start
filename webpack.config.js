const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackVersionPlugin = require('webpack-version-plugin');
const WebpackMerge = require('webpack-merge');
const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'src');
const BUILD_PATH = path.resolve(ROOT_PATH, 'build');
const manifest = require('./vendor/react.manifest.json');
const svgDirs = [
  path.resolve(ROOT_PATH, 'src/assets/svg') // 自己私人的 svg 存放目录
];

module.exports = WebpackMerge(
  process.env.NODE_ENV === 'dev' ? require('./webpack.dev.js') : require('./webpack.build.js'),
  {
    output: {
      path: BUILD_PATH, // 编译到当前目录
      filename: 'js/[name].js'
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.scss$/,
          use: [
            'css-hot-loader',
            MiniCssExtractPlugin.loader,
            'css-loader?importLoaders=1', // 在 css-loader 前应用的 loader 的数量
            'sass-loader'
          ]
        },
        {
          test: /\.jsx?$/, // 用babel编译jsx和es6
          include: [APP_PATH], // 指定检查的目录
          exclude: /node_modules/,
          use: [
            'cache-loader', // 在一些性能开销较大的 loader 之前添加此 loader，以将结果缓存到磁盘里。
            'thread-loader', // 把这个 loader 放置在其他 loader 之前， 放置在这个 loader 之后的 loader 就会在一个单独的 worker 池(worker pool)中运行
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true, //使用默认缓存目录，尝试读取缓存，来避免在每次执行时，可能产生的、高性能消耗的 Babel 重新编译过程
                // modules关闭 Babel 的模块转换功能，保留原本的 ES6 模块化语法
                presets: ['react', 'stage-2', ['env', { modules: false }]],
                plugins: [
                  'transform-runtime',
                  'transform-decorators-legacy',
                  'transform-class-properties',
                  'react-hot-loader/babel'
                ]
              }
            }
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf)(\?.*$|$)/,
          use: ['url-loader'],
          exclude: [svgDirs]
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: ['url-loader?limit=8192&name=images/[hash:8].[name].[ext]']
        },
        {
          test: /\.(svg)$/i,
          use: ['svg-sprite-loader'],
          include: svgDirs // 把 svgDirs 路径下的所有 svg 文件交给 svg-sprite-loader 插件处理
        }
      ]
    },
    plugins: [
      // HtmlWebpackPlugin 创建了一个全新的文件，所有的 bundle 会自动添加到 html 中。
      new HtmlWebpackPlugin({
        filename: './index.html', // 生成的html存放路径，相对于 path
        template: './src/index.html',
        inject: true, // 允许插件修改哪些内容，包括head与body
        hash: true // 为静态资源生成hash值
      }),
      // 该插件将给定的JS或CSS文件添加到Webpack知道的文件中，并将其放入资源列表中，html-webpack-plugin注入生成的html。
      new AddAssetHtmlPlugin({
        filepath: path.resolve(ROOT_PATH, 'vendor/*.dll.js')
      }),
      // 在这引用之前打包出来的依赖
      new webpack.DllReferencePlugin({
        context: ROOT_PATH,
        manifest,
        extensions: ['.js', '.jsx']
      }),
      /**
       * 此插件将CSS提取到单独的文件中。它为每个包含CSS的JS文件创建一个CSS文件。
       * 它支持CSS和SourceMaps的按需加载。
       **/
      new MiniCssExtractPlugin({
        filename: 'css/[name].css'
      }),

      new WebpackVersionPlugin({
        cb: hashMap => {
          console.log(hashMap);
        }
      })
    ],
    resolve: {
      modules: ['node_modules', path.join(ROOT_PATH, './node_modules')],
      extensions: ['.js', '.jsx', '.scss', '.json'],
      alias: {
        components: path.resolve(APP_PATH, './components')
      }
    }
  }
);
