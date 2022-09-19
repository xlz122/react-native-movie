const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appDirectory = path.resolve(__dirname, '../');

// 添加需要编译的react-native包
const compileNodeModules = [
  'react-native-reanimated',
  'react-native-linear-gradient',
  'react-native-webview'
].map(moduleName => path.resolve(appDirectory, `node_modules/${moduleName}`));

// This is needed for webpack to compile JavaScript.
// Many OSS React Native packages are not compiled to ES5 before being
// published. If you depend on uncompiled packages they may cause webpack build
// errors. To fix this webpack can be configured to compile to the necessary
// `node_module`.
const babelLoaderConfiguration = {
  test: /\.js$|tsx?$/,
  // Add every directory that needs to be compiled by Babel during the build.
  include: [
    path.resolve(appDirectory, 'index.web.js'),
    path.resolve(appDirectory, 'App.tsx'),
    path.resolve(appDirectory, 'src'),
    path.resolve(appDirectory, 'node_modules/react-native-uncompiled'),
    ...compileNodeModules
  ],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      // The 'metro-react-native-babel-preset' preset is recommended to match React Native's packager
      presets: ['module:metro-react-native-babel-preset'],
      // Re-write paths to import only the modules needed by the app
      plugins: ['react-native-web']
    }
  }
};

// This is needed for webpack to import static images in JavaScript files.
const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]',
      esModule: false
    }
  }
};

module.exports = {
  devtool: 'source-map',
  entry: [
    // load any web API polyfills
    // path.resolve(appDirectory, 'polyfills-web.js'),
    // your web-specific entry file
    path.resolve(appDirectory, 'index.web.js')
  ],

  // configures where the build ends up
  output: {
    filename: 'bundle.web.js',
    path: path.resolve(appDirectory, 'build')
  },

  // ...the rest of your config
  module: {
    rules: [
      babelLoaderConfiguration,
      imageLoaderConfiguration,
      {
        test: /\.ttf$/,
        loader: 'url-loader',
        include: path.resolve(appDirectory, 'src/assets/fonts/iconfont.ttf')
      }
    ]
  },

  resolve: {
    // This will only alias the exact import "react-native"
    alias: {
      'react-native$': 'react-native-web',
      'react-native-linear-gradient': 'react-native-web-linear-gradient'
    },
    // If you're working on a multi-platform React Native app, web-specific
    // module implementations should be written in files using the extension
    // `.web.js`.
    extensions: ['.web.js', '.js', '.ts', '.tsx']
  },

  devServer: {
    proxy: {
      '/api': {
        target: 'https://test-h5-api.ixook.com',
        ws: true,
        secure: false,
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(appDirectory, 'web/index.html'), // 指定模板路径
      filename: 'index.html', // 指定文件名
      favicon: path.resolve(appDirectory, 'web/favicon.ico')
    }),
    new webpack.DefinePlugin({
      process: { env: {} },
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development'
      ),
      __DEV__: process.env.NODE_ENV !== 'production' || true
    })
  ]
};
