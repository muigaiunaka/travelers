var path = require('path');
 var webpack = require('webpack');

 module.exports = {
     entry: './scripts/main.js',
     output: {
         path: path.resolve(__dirname, 'public/build'),
         filename: 'bundle.js'
     },
     module: {
         loaders: [
             {
                 test: /\.js$/,
                 exclude: /(node_modules)/,
                 loader: 'babel-loader',
                 query: {
                     presets: ['es2015']
                 }
             },
             {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
             }
         ]
     },
     stats: {
         colors: true
     },
     devtool: 'source-map',
     watch: true
 };