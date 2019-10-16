const path = require( 'path' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );

const config = () => {
  const env = process.env.NODE_ENV || 'development';
  const isDev = env === 'development';
  const isProd = env === 'production';

  return {
    mode: env,
    devtool: isDev ? false : 'source-map',
    devServer: isDev
      ? {
        contentBase: path.resolve( __dirname, '../dist' ),
        compress: true,
        port: 3000,
      }
      : false,

    entry: {
      bundle: [ './src/index.js' ],
    },

    resolve: {
      alias: {
        svelte: path.resolve( __dirname, '../node_modules', 'svelte' ),
      },
      extensions: [ '.mjs', '.js', '.svelte' ],
      mainFields: [ 'svelte', 'browser', 'module', 'main' ],
    },

    output: {
      filename: '[name].js',
      chunkFilename: '[name].[id].js',
      path: path.resolve( __dirname, '../dist' ),
    },

    module: {
      rules: [
        {
          test: /\.svelte$/,
          exclude: /node_modules/,
          use: {
            loader: 'svelte-loader',
            options: {
              emitCss: !isDev,
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
          ],
        },
      ],
    },

    plugins: [
      new MiniCssExtractPlugin( {
        filename: '[name].css',
      } ),
      new HtmlWebpackPlugin( {
        template: path.resolve( __dirname, '../public/index.html' ),
        minify: true,
      } ),
    ],
  };
};

module.exports = config();
