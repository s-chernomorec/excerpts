var webpack = require('webpack');
var path = require('path');
var glob = require('glob');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var PurifyCSSPlugin = require('purifycss-webpack');
var CompressionPlugin = require('compression-webpack-plugin');
//var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dis'),
    publicPath: '/dis/',
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
			{ test: /\.(js|jsx)$/, loader: 'babel-loader', exclude: /node_modules/ },
	    {
        test: /\.(scss|css)$/,
        include: path.resolve(__dirname, "src/sass"),
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options : { minimize: false, sourceMap: false, url: false }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: function () { return [ require('autoprefixer') ]; }
              }
            },
            {
              loader: "sass-loader"
            }
          ]
        })
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader'
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("main.css"),
		new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
			comments: false,
			compress: {
				unused: true,
				dead_code: true,
				warnings: false,
				drop_debugger: true,
				conditionals: true,
				evaluate: true,
//				drop_console: true, // strips console statements
				sequences: true,
				booleans: true,
			},
			sourceMap: false
     }),
		new webpack.optimize.AggressiveMergingPlugin(),
		new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]
}
