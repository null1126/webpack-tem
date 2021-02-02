const path = require('path')
// 生成html文件plugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 删除已存在的打包文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 压缩css
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const OptimizeCssAssetsWebpackPlugin = requier('optimize-css-assets-webpack-plugin')
// 压缩js
const TerserWebpackPlugin = require('terser-webpack-plugin')
// 分析包大小
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports  = {
    mode: 'development',
    entry: './src/main.js',
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
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                // 由于版本原因安装最新版会解析报错 建议使用 npm install less-loader@4.1.0 --save-dev 安装
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.js$/,
                use: {
                  loader: 'babel-loader'
                },
                exclude: '/node_modules/'
            },
            {
                test: /\.(png|jpg|jpeg|gif|bmp)$/,
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
                    //         progressive: true,
                    //         },
                    //         // optipng.enabled: false will disable optipng
                    //         optipng: {
                    //         enabled: false,
                    //         },
                    //         pngquant: {
                    //         quality: [0.65, 0.90],
                    //         speed: 4
                    //         },
                    //         gifsicle: {
                    //         interlaced: false,
                    //         },
                    //         // the webp option will enable WEBP
                    //         webp: {
                    //         quality: 75
                    //         }
                    //     }
                    // }
                ]
            },
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
        // new OptimizeCssAssetsWebpackPlugin(),
        // 压缩css
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
        // 分析包大小
        // new BundleAnalyzerPlugin(),
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