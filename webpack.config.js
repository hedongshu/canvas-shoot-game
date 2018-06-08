const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') // html模板
const CopyWebpackPlugin = require('copy-webpack-plugin') // 复制资源
const ExtractTextPlugin = require('extract-text-webpack-plugin') // 分离css
const CleanWebpackPlugin = require('clean-webpack-plugin') // 自动清理dist文件夹

module.exports = {
    entry: './src/js/app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
        // publicPath: '/'
    },
    devtool: 'inline-source-map',
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new ExtractTextPlugin('styles.css'),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            filename: 'index.html'
        }),
        new CopyWebpackPlugin([
            {
                from: __dirname + '/src/img',
                to: __dirname + '/dist/img'
            }
        ])
    ],
    devServer: {
        contentBase: './dist'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            }
        ]
    }
}
