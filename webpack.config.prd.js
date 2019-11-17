// webpack 是使用node写出来的，所以要使用node语法
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  mode: "production",   // 模式，production（默认）、development
  context: path.resolve(__dirname),
  entry: path.resolve(__dirname, "src/main.js"), // 入口
  output: {  // 出口
    publicPath: "./",
    filename: "[name].[contenthash:8].js",
    chunkFilename: '[name].[contenthash:8].js',
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }, {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {}
          },
          "css-loader",
          "postcss-loader"
        ]
      }, {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "less-loader"]
      }, {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              fallback: "file-loader",
              name: '[name][hash:6].[ext]',
              outputPath: "images/"
            }
          }
        ]
      }]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Webpack Demo",
      filename: "main.html",
      template: path.resolve(__dirname, "public/main.html")
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:8].css",
      chunkFilename: '[name].[contenthash:8].css',
      ignoreOrder: false
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [new UglifyJsPlugin(), new OptimizeCssAssetsPlugin({})],
  }
};


