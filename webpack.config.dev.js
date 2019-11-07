// webpack 是使用node写出来的，所以要使用node语法
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
//清除上次编译的内容
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
//分离CSS为单独的文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: "development",   // 模式，production（默认）、development
  entry: path.resolve(__dirname, "src/main.js"), // 入口
  output: {  // 出口
    filename: "bundle.[name].js",
    path: path.resolve(__dirname, "dist")
  },
  devtool: "inline-source-map",
  devServer: {
    //从哪里读取资源
    contentBase: path.resolve(__dirname, "dist"),
    //资源路径
    publicPath: "/",
    port: 9528,
    //允许所有外部访问
    host: "0.0.0.0",
    //启动服务时，自动打开浏览器
    open: true,
    // hot: true,
    //自动打开浏览器时访问的URL
    public: "http://localhost:9527",
    //启动时需要导航到的页面
    // openPage: "/",
    clientLogLevel: "none",
    //入口HTML的名称
    index: "main.html",
    noInfo: true,
    overlay: true,
    //是否展示进度条
    progress: true
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        "css-loader",
        "postcss-loader"
      ]
    }, {
      test: /\.less$/,
      use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "less-loader"]
    }]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Webpack Demo",
      filename: "main.html",
      template: path.resolve(__dirname, "public/main.html")
    }),
    new MiniCssExtractPlugin()
    // new webpack.NamedModulesPlugin(),
    // new webpack.HotModuleReplacementPlugin()
  ]
};


