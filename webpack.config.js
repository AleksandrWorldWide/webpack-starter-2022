const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const webpack = require("webpack")
const CopyPlugin = require("copy-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const TerserPlugin = require("terser-webpack-plugin")
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin")

const path = require('path')
const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => {
	const config = {
		splitChunks: {
			chunks: 'all'
		}
	}
	if (isProd) {
		config.minimizer = [
			new TerserPlugin(),
			new CssMinimizerWebpackPlugin()
		]
	}
	return config

}

module.exports = {
	context: path.resolve(__dirname, 'src'),
	mode: 'development',
	entry: {
		main: ['@babel/polyfill', './index.js'],
		analytics: './analytics.ts',
	},
	devtool: isDev ? 'source-map' : 'eval-source-map',
	output: {
		filename: '[name].[hash].js',
		path: path.resolve(__dirname, 'dist'),
		clean: true
	},
	resolve: {
		extensions: ['.js', '.json'],
		alias: {
			'@modules': path.resolve(__dirname, 'src/modules'),
			'@': path.resolve(__dirname, 'src')
		}
	},
	optimization: optimization(),
	devServer: {
		port: 5555,
		hot: false,
		compress: true
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].[hash].css'
		}),
		new CopyPlugin({
			patterns: [
			  { from: path.resolve(__dirname, 'src/favicon.ico'), 
			  to: path.resolve(__dirname, 'dist') },
			],
		 }),
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			template: './index.html',
			minify: {
				collapseWhitespace: isProd
			}
		}),
		new CleanWebpackPlugin(),
	],
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
				  loader: 'babel-loader',
				  options: {
					 presets: ['@babel/preset-env'],
					 plugins: []
				  }
				}
			 },
			 {
				test: /\.ts$/,
				exclude: /(node_modules|bower_components)/,
				use: {
				  loader: 'babel-loader',
				  options: {
					 presets: ['@babel/preset-env', '@babel/preset-typescript'],
					 plugins: []
				  }
				}
			 },
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, "css-loader"
					],
			 },
			 {
				test: /\.s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
				  "css-loader",
				  "sass-loader",
				],
			 },
			{
				test: /\.(png|jpg|jpeg|svg|gif)$/i,
				type: 'asset/resource'
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
			 },
			 {
				test: /\.(csv|tsv)$/i,
				use: ['csv-loader'],
			 },
			 {
				test: /\.xml$/i,
				use: ['xml-loader'],
			 },
		]
	}
}