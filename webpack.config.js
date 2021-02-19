const { VueLoaderPlugin } = require('vue-loader');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const webpackConfig = {
    mode: "development",
    entry: {
        vue: './vue.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        cacheDirectory: true
                    }
                }
            },
            {
                test: /\.(png|jpg|jpeg|gif|ico|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]-[contenthash].[ext]'
                        },
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]-[contenthash].[ext]'
                        },
                    }
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'public/build'),
        publicPath: 'public/build/'
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {from: './dist/vue', to: 'vue/[path][name].[contenthash].[ext]'}
            ]
        }),
        new WebpackManifestPlugin({
            publicPath: 'build/',
            basePath: '',
            map: (file) => {
                file.name = file.name.replace(/(\.[a-f0-9]{8})(\..*)$/, '$2');
                return file;
            }
        }),
        new CleanWebpackPlugin(),
        new VueLoaderPlugin()
    ],
    // optimization: {
    //     moduleIds: 'deterministic',
    //     runtimeChunk: "single",
    //     splitChunks: {
    //         cacheGroups: {
    //             vendor: {
    //                 test: /[\\/]node_modules[\\/]/,
    //                 name: 'vendors',
    //                 chunks: 'all',
    //             }
    //         }
    //     }
    // },
    devtool: 'inline-source-map'
};

module.exports = webpackConfig;
