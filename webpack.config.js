const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body',
});

const config = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'celebrity.bundle.js',
  },

  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
    loaders: [
      { test: /\.tsx$/, loader: 'awesome-typescript-loader', exclude: /node_modules/ },
      { test: /\.ts$/, loader: 'awesome-typescript-loader', exclude: /node_modules/ },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              localIdentName: "[name]--[local]--[hash:base64:8]", //Magic for react toolbox
            }
          },
          "postcss-loader"
        ]
      }
    ],
  },

  plugins: [HtmlWebpackPluginConfig],

  devServer: {
    port: 3000, // most common port
    contentBase: './dist',
    inline: true,
  },
};

module.exports = config;
