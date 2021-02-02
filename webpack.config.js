const path = require('path')
// 生成html文件plugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 删除已存在的打包文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 将css单独打包成一个文件的插件，它为每个包含css的js文件都创建一个css文件。它支持css和sourceMaps的按需加载。
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 压缩css 
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
// 压缩js
const TerserWebpackPlugin = require('terser-webpack-plugin')
// 分析包大小
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports  = {
    // 模式
    mode: 'development',
    // 打包入口
    entry: './src/main.js',
    // 打包出口
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        alias: {
            '@': path.join(__dirname, './src') // 这样@符号就表示项目根目录中src这一层路径
        }
    },
    // 由于版本问题安装最新的包会报错  建议使用 npm i webpack@4.43.0 webpack-cli@3.3.12 webpack-dev-server@3.11.0 webpack-dev-server -D 安装成套插件
    devServer: {
        port: 3000,
        hot: true,
        open: false,
        contentBase: './dist'
    },
    // 压缩js
    optimization: {
        minimize: true,
        minimizer: [
            // 由于版本原因 建议安装版本 4<v(版本)<5 
            new TerserWebpackPlugin({
                test: /\.js(\?.*)?$/i
            })
        ]
    },
    module: {
        rules: [
            // 解析css
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            // 解析less
            {
                test: /\.less$/,
                // 由于版本原因安装最新版会解析报错 建议使用 npm install less-loader@4.1.0 --save-dev 安装
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader'
                ]
            },
            // 解析js
            {
                test: /\.js$/,
                use: {
                  loader: 'babel-loader'
                },
                exclude: '/node_modules/'
            },
            // 解析图片
            {
                test: /\.(png|jpg|jpeg|gif|bmp|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'image/[name].[ext]'
                                }
                            }
                        }
                    },
                    // {
                    //     loader: 'image-webpack-loader',
                    //     options: {
                    //         mozjpeg: {
                    //             progressive: true,
                    //         },
                    //         // optipng.enabled: false will disable optipng
                    //         optipng: {
                    //             enabled: false,
                    //         },
                    //         pngquant: {
                    //             quality: [0.65, 0.90],
                    //             speed: 4
                    //         },
                    //         gifsicle: {
                    //             interlaced: false,
                    //         },
                    //         // the webp option will enable WEBP
                    //         webp: {
                    //             quality: 75
                    //         }
                    //     }
                    // },
                ]
            },
            // 解析音视频
            {
                test: /\.(mp4|ogg|mp3|wav)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 1024,
                        fallback: {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]'
                            }
                        }
                    }
                }
            }
        ]
    },
    plugins: [
        // 删除前一个打包文件
        new CleanWebpackPlugin(),
        // 压缩css
        new OptimizeCssAssetsWebpackPlugin({ // 配置  optimize-css-assets-webpack-plugin
            assetNameRegExp: /\.css$/g,
            cssProcessor: require("cssnano"), // 如果报错 安装 cnpm i cssnano -D
        }),
        // 压缩css
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
        // 分析包大小
        new BundleAnalyzerPlugin(),
        // 添加html
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            title: 'xiaozhang',
            inject: 'body',
            // 优化
            minify: {
                collapseWhitespace: true, // 去掉空格
                removeComments: true, // 去掉注释
            }
        })
    ]
}