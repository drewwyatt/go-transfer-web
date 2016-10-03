const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
	debug: true,
	devtool: 'eval-cheap-source-map',
    entry: {
		vendor: [
			"react",
			"redux",
			'whatwg-fetch',
			'react-mdl/extra/material.css',
			'react-mdl/extra/material.js'
		],
		app: [
			path.resolve('./src/index.tsx')
		]
	},
    output: {
		path: path.join(__dirname, 'dist'),
		publicPath: '/',
		filename: '[name].bundle.js',
		chunkFilename: '[id].chunk.js'
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve('./src/index.html')
		}),
		new webpack.HotModuleReplacementPlugin()
	],
    module: {
        loaders: [
			{
				test: /\.tsx?$/,
				loaders: [
					'babel',
					'ts-loader'
				],
			},
			{ test: /\.css$/, loader: "style-loader!css-loader" },
		]
    },
	resolve: {
		extensions: ['', '.ts', '.tsx', '.js', '.json', 'css']
	},
    devServer: {
		contentBase: path.resolve('./dist'),
		compress: true,
		quiet: true,
		historyApiFallback: true,
		host: "0.0.0.0",
		hot: true,
		inline: true,
		port: 3000,
		watchOptions: {
			aggregateTimeout: 300,
			poll: 1000
		}
	}
};

module.exports = config;