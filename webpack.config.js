const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = {
	entry: `/src/main.js`,
	module: {
		rules: [
			{ test: /\.js$/, use: 'babel-loader' },
			{ test: /\.vue$/, use: 'vue-loader' },
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					'sass-loader'
				]
			},
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
				test: /\.(jpg|jpeg|gif|png|webp|svg|ico)$/,
				exclude: [/fonts|webfonts/],
				use: {
					loader: 'file-loader',
					options: {
						outputPath: './img',
						name: '[name].[hash].[ext]'
					}
				}
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
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, './src/index.html')
		}),
		new MiniCssExtractPlugin({
			filename: 'css/[name]-[hash].css'
		}),
		new VueLoaderPlugin(),
		new webpack.HotModuleReplacementPlugin()
	]
};
