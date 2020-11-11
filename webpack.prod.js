const path = require('path');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
	mode: 'production',
	devtool: 'source-map',
	output: {
		filename: 'js/[name].min.js',
		path: path.resolve(__dirname, 'dist'),
	},
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: 'css/[name].min.css',
		}),
		new VueLoaderPlugin(),
	],
	optimization: {
		minimizer: [
			new OptimizeCssAssetsWebpackPlugin(),
			new TerserPlugin(),
			new HtmlWebpackPlugin({
				template: path.resolve(__dirname, 'src/index.html'),
				minify: {
					removeAttributeQuotes: true,
					collapseWhitespace: true,
					removeComments: true,
				},
			}),
		],
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader',
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					'vue-style-loader',
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					'sass-loader',
				],
			},
			{
				test: /\.(jpg|jpeg|gif|png|webp|svg)$/,
				exclude: [/fonts|webfonts/],
				use: {
					loader: 'file-loader',
					options: {
						outputPath: 'img',
						name: '[name].[ext]',
						esModule: false,
					},
				},
			},
		],
	},
});
