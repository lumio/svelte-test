const path = require( 'path' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );

const config = () => {
  return {
    mode: process.env.NODE_ENV || 'development',
    entry: './src/index.js',
    output: {
      filename: 'main.js',
      path: path.resolve( __dirname, '../dist' ),
    },
    plugins: [
      new HtmlWebpackPlugin( {
        template: path.resolve( __dirname, '../public/index.html' ),
      } ),
    ],
  };
};

module.exports = config();
