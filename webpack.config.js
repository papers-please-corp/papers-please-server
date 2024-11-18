const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './api.js', // Adjust if your entry point is different
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  mode: 'development', // Set the mode to 'development' or 'production'
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!(express-validator)\/).*/,  // This ensures express-validator gets transpiled
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-proposal-optional-chaining',
              '@babel/plugin-proposal-nullish-coalescing-operator'
            ],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /express\/lib\/view/,
      contextRegExp: /express$/,
    }),
  ],
};