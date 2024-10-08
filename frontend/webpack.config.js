const path = require("path");

module.exports = {
  entry: "./index.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "production",
  node: {
    global: false,
  },
  performance: {
    maxEntrypointSize: 2048000,
    maxAssetSize: 2048000,
  },
};
