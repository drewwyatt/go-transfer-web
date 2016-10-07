var path = require('path')
var webpack = require('webpack')

var config = {
	devtool: 'eval-cheap-source-map',
	debug: true,
	entry: path.resolve('./_tests_/index.ts'),
	output: {
		path: path.join(__dirname, '_tests_'),
		publicPath: '/',
		filename: 'app.test.js',
	},
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin()
	],
	module: {
		loaders: [{
			test: /\.tsx?$/,	
			loaders: [
				'babel?presets[]=es2015',
				'ts-loader'
			]
		}]
	},
	resolve: {
		extensions: ['', '.ts', '.tsx']
	}
};

module.exports = config;

