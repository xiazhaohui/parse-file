const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env) => {
  const format = env && env.format;
  const isESM = env.format === "esm"; // 根据环境变量判断格式

  return {
    mode: "production",
    entry: "./src/index.ts",
    output: {
      filename: format === "esm" ? "index.esm.js" : "index.umd.js",
      path: path.resolve(__dirname, "dist"),
      library: isESM
        ? { type: "module" }
        : {
            name: "@xiazhaohui/parse-file",
            type: "umd", // 打包生成库可以通过esm/commonjs/reqirejs的语法引入
          },
    },
    experiments: {
      outputModule: isESM, // 如果是 ESM 格式，则启用 outputModule
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(), // 添加插件
    ],
  };
};
