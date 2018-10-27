const webpack = require('webpack');
const ExtractTextInput = require('extract-text-webpack-plugin');

module.exports = {
	entry: './sr /index.jsx',
	output: {
		path: __dirname + '/public',
		filename: './app.js',
	},
	devServer: {
		port: 8080,
		contentBase: './public',
	},
	resolve: {
		extensions: [ '', '.js', '.jsx' ],
		alias: {
			modules: _dirname + '/node_modules',
		},
	},
	plugins: [
	  new ExtractTextInput('app.css')
	],
	module: {
		loaders: [{
			test: /.js[x]?$/,
			loader: 'babel-loader',
			exclude: '/node_modules',
			query: {
				presets: ['es2015', 'react'],
				plugins: [ 'transform-object-rest-spread']
			}
		},{
			test: /\.woff|.woff2|.ttf|.eot|.svg*.*$/,
			loader: 'file'
		}]
	}
};