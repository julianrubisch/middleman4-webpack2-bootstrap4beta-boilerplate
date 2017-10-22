"use strict";
const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const cssLoaders = [
  {
    loader: "css-loader",
    options: {
      modules: true,
      minimize: true
    }
  },
  {
    loader: "sass-loader"
  }
]
module.exports = {
  context: __dirname + "/source",
  entry: {
    site: "./javascripts/site.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
      },
      {
        test: /\.(sass|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader",
            {
              loader: 'postcss-loader', // Run post css actions
              options: {
                plugins: function () { // post css plugins, can be exported to postcss.config.js
                  return [
                    require('precss'),
                    require('autoprefixer')
                  ];
                }
              }
            },
          "sass-loader"]
        })
      },
    ],//end rules
  },
  output: {
    path: __dirname + "/.tmp/dist/javascripts",
    filename: "[name].bundle.js",
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new ExtractTextPlugin({
      filename:  (getPath) => {
        return getPath("../stylesheets/[name].bundle.css").replace("css/js", "css");
      },
      disable: false,
      allChunks: true,
    }),
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Popper: ['popper.js', 'default'],
        // In case you imported plugins individually, you must also require them here:..
      }),
  ],
};
