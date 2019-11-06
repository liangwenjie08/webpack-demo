// webpack 是使用node写出来的，所以要使用node语法
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",   // 模式，production（默认）、development
  entry: path.resolve(__dirname, "src/main.js"), // 入口
  output: {  // 出口
    filename: "bundle.[contenthash].js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ["style-loader", "css-loader"]
    }, {
      test: /\.less$/,
      use: ["style-loader", "css-loader", {
        loader: "postcss-loader",
        options: {
          ident: "postcss",
          plugins: [
            require("autoprefixer"),
          ]
        }
      }, "less-loader"]
    }]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Webpack Demo",
      filename: "main.html",
      template: path.resolve(__dirname, "public/main.html")
    })
  ]
};


