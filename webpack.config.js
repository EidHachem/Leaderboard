const path = require('path');
const HtmlWebpacckPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, 'src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name][contenthash].js',
    clean: true,
    assetModuleFilename: '[name][ext]',
    publicPath: '/Leaderboard/',
  },
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 3002,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpacckPlugin({
      title: 'Leaderboard',
      filename: 'index.html',
      template: 'src/index.html',
    }),
  ],
};

// const productionConfig = merge([
//   {
//     output: {
//       publicPath: '/Leaderboard/',
//     },
//   },
// ]);
