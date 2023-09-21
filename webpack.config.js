const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      // Правила для загрузки JavaScript и JSX через Babel
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  plugins: [], // Плагины Webpack (если необходимо)
  devServer: {
    static: {
      directory: path.join(__dirname, "public"), // Директория, из которой обслуживается сервер
    },
    port: 3000, // Порт для сервера
    open: true, // Автоматически открывать браузер после запуска
  },
};
