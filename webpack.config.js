var path = require('path');
var webpack = require('webpack');
module.exports = {
    entry: './js/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ],
    module: {
        rules: [{
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }]
    }
};