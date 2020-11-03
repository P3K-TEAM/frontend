const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	entry: {
		polyfill: '@babel/polyfill',
		main: path.resolve(__dirname, 'src/main.js')
	},
	resolve: {
		extensions: ['.js', '.vue'],
		alias: {
			vue$: 'vue/dist/vue.runtime.min.js',
			'@': path.resolve(__dirname, './src')
		}
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'src/index.html')
		}),
		new webpack.HotModuleReplacementPlugin()
	],
	module: {
		rules: [
			{ test: /\.vue$/, use: 'vue-loader' },
			{
				test: /\.(woff(2)?|ttf|otf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				exclude: [/img/],
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'fonts/',
							publicPath: '../fonts/'
						}
					}
				]
			},
			{
				test: /favicon.ico$/,
				use: {
					loader: 'file-loader',
					options: {
						outputPath: './',
						name: '[name].[ext]'
					}
				}
			}
		]
	}
};
