const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');



const paths = {
    DIST: path.resolve(__dirname, 'frontend', 'dist'),
    SRC: path.resolve(__dirname, 'frontend', 'src')
};

module.exports = {
    entry: path.join(paths.SRC, 'index.js'),
    output: {
        path: paths.DIST,
        filename: 'index.bundle.js',
        publicPath: "/static/"
    },

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
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            output: {
                comments: false
            }
        }),
        new HtmlWebpackPlugin({
            template: path.join(paths.SRC, 'index.html')
        }),
        new ExtractTextPlugin('style.bundle.css'),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ],

    devtool: 'cheap-module-source-map',

    // Resolve allows us to import things as just 'from example' rather than 'from example.js'
    resolve: {
        extensions: ['.js', '.jsx'],
        modules:[
            "node_modules",
            path.resolve(__dirname, 'frontend/src')
        ]
    }
};
