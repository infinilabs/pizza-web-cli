/* eslint-disable no-undef */
const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const tsImportPluginFactory = require("ts-import-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "../src/main.jsx"), // 项目入口，处理资源文件的依赖关系
  output: {
    publicPath: '/',
    filename: "bundle.js",
    path: path.join(__dirname, "../lib"),
  },
  module: {
    rules: [
      {
        test: /\.(jsx|tsx|js|ts)$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [
              tsImportPluginFactory([
                {
                  libraryName: "antd",
                  style: true,
                },
              ]),
            ],
          }),
          compilerOptions: {
            module: "es2015",
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ["file-loader"],
      },
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      filename: "index.html",
      template: path.join(__dirname, "../index.html"),
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^Buffer$/, // 忽略 'buffer' 模块
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, "../lib"),
    compress: true,
    port: 3002,
    open: true,
    proxy: {
      "/elasticsearch/": {
        target: "http://infini.internal:9000",
        changeOrigin: true,
        //  pathRewrite: { '^/server': '' },
      },
    },
  },
  resolve: {
    // 后缀名自动补全，引入时可不必写后缀名
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    fallback: {
      url: require.resolve("url/"), // 使用浏览器兼容版的 url 模块
      buffer: false,
      Buffer: false,
      https: false,
      http: false,
      // 其他 Node.js 核心模块的 fallback 配置
    },
  },
};
