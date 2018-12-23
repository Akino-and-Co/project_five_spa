// TODO: Webpack not working, figure out all errors and bugs
const path = require('path')
const webpack = require('webpack')
// const css = require('./file.styl') // Just the CSS
// const css = require('!css!stylus!./file.styl') // CSS with processed url(...)s
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const BundleTracker = require('webpack-bundle-tracker')
const WriteFilePlugin = require('write-file-webpack-plugin')
const WebpackMd5Hash = require('webpack-md5-hash')
// Not used Loader v
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin')

// for HTML
const HtmlWebpackPlugin = require('html-webpack-plugin')

const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, './dist/'), 
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    new CleanWebpackPlugin('dist', {} ),
    new VueLoaderPlugin(),
    new BundleTracker({filename: 'webpack-stats.json'}),
    new WriteFilePlugin(),
    // new ExtractTextPlugin(
    //   {filename: 'style.[chunkhash].css', disable: false, allChunks: true}
    // ),
    // Custom copy for files like external images
    new CopyWebpackPlugin([
      {
        from: './src/assets',
        to: path.resolve(__dirname, './dist/assets'),
        toType: 'dir'
      }
    ]),
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/index.html',
      filename: 'index.html'
    }),
    new WebpackMd5Hash()
  ],
  module: {
    rules: [
    //   {
    //     test: /\.styl$/,
    //     loader: 'css-loader!stylus-loader?paths=node_modules/bootstrap-stylus/stylus/'
    //   },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: ['@vue/app', '@babel/env']
          }
        },
      },
      {
        test: /\.(sa|sc|c)ss|styl$/,
        use:  [  'style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                outputPath: 'fonts/'
            }
        }]
      },
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
            {
                loader: 'ts-loader',
                options: {
                    // Needed for <script lang="ts"> to work in *.vue files; see https://github.com/vuejs/vue-loader/issues/109
                    appendTsSuffixTo: [ /\.vue$/ ]
                }
            },
        ]
      },
      // Below for images and such
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
              name: '[name].[ext]',
              outputPath: 'images/'
          }
        }]
      },
      // Below for data files
      {
        test: /\.(csv|tsv)$/,
        use: [
          'csv-loader'
        ]
      },
      {
        test: /\.xml$/,
        use: [
          'xml-loader'
        ]
      }
    ]
  },
  resolve: { 
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      // '@': 'src',
    },
    extensions: ['*', '.js', '.vue', '.json', ".ts", ".tsx"]
  },
  watch: true,
}