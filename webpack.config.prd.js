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
  entry: path.resolve(__dirname, "src/index.js"), // 入口
  output: {  // 出口
    publicPath: "./",
    filename: "[name].[contenthash:8].js",
    chunkFilename: "[name].[contenthash:8].js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }, {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
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
              name: "[name][hash:6].[ext]",
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
      filename: "index.html",
      template: path.resolve(__dirname, "public/index.html"),
      //压缩HTML
      minify: {
        //移除注释
        removeComments: true,
        //去除空白
        collapseWhitespace: true,
        //尽可能去除多余的引号
        removeAttributeQuotes: true,
        //布尔属性使用简写，例如：disabled = true 简写为 disabled
        collapseBooleanAttributes: true,
        //移除script标签的 type="text/javascript"，其他保留
        removeScriptTypeAttributes: true,
        //压缩css
        minifyCSS: true
      },
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:8].css",
      chunkFilename: "[name].[contenthash:8].css",
      ignoreOrder: false
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [new UglifyJsPlugin(), new OptimizeCssAssetsPlugin({})],
    //分离代码
    splitChunks: {
      chunks: "all",
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: "_",
      name: true,
      cacheGroups: {
        vendors: {
          name: "chunk_vendors",
          test: /node_modules/,
          priority: 10,
          chunks: "initial"
        },
        commons: {
          name: "chunk_commons",
          priority: 1,
          minChunks: 2,
          chunks: "initial"
        }
      }
    }
  }
};


