const path = require('path');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
	mode: 'development',
	output: {
		filename: 'js/[name]-[hash].js',
		path: path.resolve(__dirname, 'dist')
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'css/[name]-[hash].css'
		}),
		new VueLoaderPlugin()
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader'
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					'vue-style-loader',
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					'sass-loader'
				]
			},
			{
				test: /\.(jpg|jpeg|gif|png|webp|svg)$/,
				exclude: [/fonts|webfonts/],
				use: {
					loader: 'file-loader',
					options: {
						outputPath: './img',
						name: '[name].[hash].[ext]',
						esModule: false
					}
				}
			}
		]
	}
});
