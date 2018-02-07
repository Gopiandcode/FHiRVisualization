const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');



const paths = {
    DIST: path.resolve(__dirname, 'frontend', 'dist'),
    SRC: path.resolve(__dirname, 'frontend', 'src')
};

module.exports = {
    entry: [
        'webpack-hot-middleware/client',
        path.join(paths.SRC, 'index.js')
    ],
    output: {
        path: paths.DIST,
        filename: 'index.bundle.js',
        publicPath: "/static/"
    },
    watch: true,

    watchOptions: {
        ignored: [
            /node_modules/,
        ]
    },

    devtool: 'eval',

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                    'eslint-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                             "css-loader",
                             "sass-loader"
                    ],
                    fallback: "style-loader"
                })
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    // Plugins for the project
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(paths.SRC, 'index.html')
        }),
        new ExtractTextPlugin('style.bundle.css')
    ],



    // Resolve allows us to import things as just 'from example' rather than 'from example.js'
    resolve: {
        extensions: ['.js', '.jsx'],
        modules:[
            "node_modules",
            path.resolve(__dirname, 'frontend/src')
        ]
    }
};
