const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PUBLIC_PATH = '/';

module.exports = {
    entry: {
        app: "./src/main.js"
    },
    output: {
        filename: 'js/[name].bundle.js',
        path: path.resolve(__dirname, 'dist'), 
        publicPath: PUBLIC_PATH 
    },
    devServer: {
        contentBase: path.join(__dirname, './'), 
        publicPath: PUBLIC_PATH, 
        hot: true,
        open: true
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
        alias: {
            '@': path.resolve(__dirname, 'src') 
        }
    },
    module: {
        rules: [
            {
                
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(css)$/,
                use: [
                    "style-loader", 
                    "css-loader", 
                ]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html",
            title: "Learning Webpack"
        }),
    ]
}