var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

console.log('base path:');
console.log(process.env.BASE_PATH);

var config = {
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
		publicPath: (process.env.BASE_PATH) ? '/' + process.env.BASE_PATH : '/',
		filename: '[name].bundle.js',
		chunkFilename: '[id].chunk.js'
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve('./src/index.html')
		}),
		new webpack.HotModuleReplacementPlugin(),
        new CopyWebpackPlugin([
            { from: path.resolve('./src/404.html') }
        ]),
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
            { test: /\.txt/, loader: 'raw-loader' }
		]
    },
	resolve: {
		extensions: ['', '.ts', '.tsx', '.js', '.json', 'css', 'txt']
	},
    devServer: {
		contentBase: path.resolve('./dist'),
		compress: true,
        historyApiFallback: {
            rewrites: [
                {
                    from: /^\/download\/.*$/,
                    to: function() {
                        console.log('resolving!');
                        return 'index.html';
                    }
                }
            ]
        },
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