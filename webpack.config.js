const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssets = require('optimize-css-assets-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');

const devMode = process.env.NODE_ENV === 'development';

let config = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  plugins: [
    new DashboardPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: false
    }),
    // new HtmlWebpackPlugin({
    //     template: './src/about.html',
    //     inject: true,
    //     chunks: ['index'],
    //     filename: 'about.html'
    // }),
    new MiniCssExtractPlugin({
      filename: 'styles.css'
    })
  ],
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    },{
      test: /\.(sa|sc|c)ss$/,
      use: [{
        loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
      },{
        loader: 'css-loader'
      },{
        loader: 'postcss-loader'
      },{
        loader: 'sass-loader',
        options: {
          includePaths: ['./node_modules']
        }
      }]
    },{
      test: /\.html$/,
      loaders: [
        'html-loader'
      ]
    },{
      test: /\.(jpe?g|png|gif|svg)$/i,
      loaders: [{
        loader: 'file-loader',
        options: {
          name: 'assets/[name].[ext]'
        }
      }]
    }]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, 'src'),
    watchContentBase: true,
    open: true,
    clientLogLevel: 'none'
  }
};
module.exports = config;

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins.push(
    new OptimizeCSSAssets() // call the css optimizer (minification)
  );
  module.exports.plugins.push(
    new CleanWebpackPlugin(['public'])
  );
}
