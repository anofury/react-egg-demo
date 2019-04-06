const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        index: path.resolve(__dirname, './src/index.jsx')
    },
    output: {
        path: path.resolve(__dirname, './page/'),
        filename: 'js/[name].js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, './page'),
        host: 'localhost',
        port: '8888',
        inline: true,
        watchOptions: {
            aggregateTimeout: 2000,
            poll: 1000
        },
        compress: true,
        historyApiFallback: true,
        hot: true,
        open: true,
    },
    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                use: {
                    loader: 'babel-loader',
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
            },
            {
                test: /\.(png|jpg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: '[name].[ext]',
                        outputPath: 'img/'
                    }
                }]
            }
        ]
    },
    // 压缩css
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html'),
            title: 'test',
            inject: true,
            // 压缩html
            minify: {
                removeRedundantAttributes: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeComments: true,
                collapseBooleanAttributes: true
            },
            chunks: 'all'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: '[id].css'
        }),
        new CopyWebpackPlugin([
            { 
                from: path.resolve(__dirname, './public'), 
                to: path.resolve(__dirname, './page'),
                ignore: '*/ori/*'
            }
        ])
    ]
};