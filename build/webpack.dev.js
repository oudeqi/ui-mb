const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
	devtool: 'eval-source-map',
	output: {
		path: path.resolve(__dirname, '..', 'dist'),
		filename: 'js/[name].bundle.js',
		chunkFilename: 'js/[name].bundle.js',
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader',
						options: { sourceMap: true }
					},
				    {
				    	loader: 'css-loader',
				    	options: {
				    		sourceMap: true,
				    		modules: false,
				    		importLoaders: 1
				    	}
					},
				    {
				    	loader: 'postcss-loader', 
				    	options: {
				    		sourceMap: true
				    	}
				    }
				]
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							// publicPath: '/',
							name: 'img/[name].[ext]',
							limit: 1024 * 5,
							fallback:'file-loader'
						}
					}
				]
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
				loader: 'file-loader',
				options: {
					name: 'font/[name].[ext]',
					publicPath: '../',
					limit: 1024 * 10,
				}
			}	
		]
	},
	plugins: [
		// new webpack.NamedModulesPlugin(),
		// new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        })
	],
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		port: 9000,
		clientLogLevel: "info",
		host: "0.0.0.0",
		useLocalIp: true,
		historyApiFallback: true,
		open: true,
		// hot: true,
		// hotOnly: true,
		publicPath: '/'
	},
});