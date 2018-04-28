const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	entry: {
		index: ['./test/index.js']
	},
	resolve: {
		modules: [ 'node_modules', path.resolve(__dirname, '..', 'src'), path.resolve(__dirname, '..', 'test') ],
		extensions: [".js", ".json", ".jsx", ".css"],
		alias: {
			'src': path.resolve(__dirname, '..', 'src'),
            'test': path.resolve(__dirname, '..', 'test'),
		}
	},
	externals: { //防止将某些外部引用的包打包到 bundle 中
		// jquery: 'jQuery'
	},
	module: {
		noParse: /jquery|lodash/,
		rules: [
			{
				test: /(\.jsx|\.js)$/,
				include: path.resolve(__dirname, '..', 'src'),
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader'
			},
			{
				test: /\.html$/,
				use: [
					{
                        loader: "html-loader",
                        options: {
                            attrs: [':data-src'],
                            interpolate: true,
                            minimize: false,
                            removeComments: false,
                            collapseWhitespace: false,
                        }
                    }
				]
			}
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new HtmlWebpackPlugin({
			template: './test/index.html',
			filename: 'index.html',
			// chunks: ['main']
		}),
	]	
};




