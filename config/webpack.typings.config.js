'use strict';

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const resolve = require('resolve');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const paths = require('./paths');
const { sassRegex, cssModuleRegex } = require('./webpack.config');

const cssConfig = [
  'style-loader',
  'css-loader',
  {
    loader: 'typed-css-modules-loader',
    options: {
      noEmit: true,
    },
  },
  'sass-loader',
];

module.exports = {
  mode: 'production',
  bail: true,
  devtool: false,
  entry: paths.appStylesheets,
  output: {
    path: paths.appBuild,
  },
  module: {
    rules: [
      {
        test: sassRegex,
        exclude: /node_modules/,
        use: [
          ...cssConfig,
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: cssModuleRegex,
        exclude: /node_modules/,
        use: cssConfig,
      },
    ],
  },
};
