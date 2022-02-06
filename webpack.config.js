'use strict';

let path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: './src/js/index.js',
  output: {
    filename: './js/index.js',
    path: path.resolve(__dirname, "dist")
  },
  watch: true,

  devtool: "source-map",
  plugins: [
    new CopyPlugin({
      patterns: [{
          from: "./src/css",
          to: "./css"
        },
        {
          from: "./src/icons",
          to: "./icons"
        },
        {
          from: "./src/img",
          to: "./img"
        },
        {
          from: "./src/index.html",
          to: "./index.html"
        }
      ],
    }),
  ],
  module: {}
};