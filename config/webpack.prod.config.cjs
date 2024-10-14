const path = require("path");
const tsImportPluginFactory = require("ts-import-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "production",
  entry: path.join(__dirname, "../src/main.jsx"),
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "../docs"),
  },
  module: {
    rules: [
      {
        test: /\.(jsx|tsx|js|ts)$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true, // 忽略类型检查
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
  plugins: [new MiniCssExtractPlugin()],
  resolve: {
    // 后缀名自动补全，引入时可不必写后缀名
    extensions: [".ts", ".tsx", ".js", ".jsx", ".less", ".css"],
    fallback: {
      url: require.resolve("url/"), // 使用浏览器兼容版的 url 模块
      buffer: false,
      Buffer: false,
      https: false,
      http: false,
      // 其他 Node.js 核心模块的 fallback 配置
    },
  },
  externals: [],
};
