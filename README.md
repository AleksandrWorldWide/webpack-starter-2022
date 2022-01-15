modes (development, production):
	"cross-env"

html:
	"html-webpack-plugin"

clean dist:
	"clean-webpack-plugin"

copy static files:
	"copy-webpack-plugin"

babel:
	"@babel/core"
	"@babel/polyfill"
	"@babel/preset-env"
	"@babel/preset-typescript"

loaderes:
	"babel-loader"
	"css-loader"
	"sass-loader"
	"csv-loader"
	"xml-loader"

load images, fonts:
	type: 'asset/resource'

minimize html:
	HtmlWebpackPlugin({
			minify: {
				collapseWhitespace: isProd
			}
		})

minimize css:
	"css-minimizer-webpack-plugin"
	"mini-css-extract-plugin"

minimize js:
	"terser-webpack-plugin"

dev server:
	"webpack-dev-server"

hot reload:
	webpack.HotModuleReplacementPlugin()



















