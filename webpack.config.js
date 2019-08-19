const HtmlWebPackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const postcssPresetEnv = require('postcss-preset-env')
const webpack = require('webpack')
const path = require('path')

const config = {
  entry: './index.js',

  optimization: {
    minimizer: [new TerserPlugin()],
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },

      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },

      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
            },
          },
        ],
      },

      {
        test: /\.module.s(a|c)ss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [postcssPresetEnv()],
            },
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
              camelCase: true,
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },

      {
        test: /\.s(a|c)ss$/,
        use: [
          'style-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [postcssPresetEnv()],
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },

      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        include: path.join(__dirname, 'src/images'),
        // inline base64 URLs for <=30k images, direct URLs for the rest
        loader: 'url-loader?limit=30000&name=assets/images/[name].[ext]',
      },

      {
        test: /\.woff(\?.*)?$/,
        loader: 'file-loader?name=assets/fonts/[name].[ext]',
      },
      {
        test: /\.woff2(\?.*)?$/,
        loader: 'file-loader?name=assets/fonts/[name].[ext]',
      },
      {
        test: /\.ttf(\?.*)?$/,
        loader: 'file-loader?name=assets/fonts/[name].[ext]',
      },
      {
        test: /\.eot(\?.*)?$/,
        loader: 'file-loader?name=assets/fonts/[name].[ext]',
      },
      {
        test: /\.svg(\?.*)?$/,
        exclude: path.join(__dirname, 'src/images'),
        loader: 'file-loader?name=assets/fonts/[name].[ext]',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.scss'],
    alias: {
      Utils: path.resolve(__dirname, 'src/utils'),
      Components: path.resolve(__dirname, 'src/components'),
      Assets: path.resolve(__dirname, 'src/assets')
    }
  },
}

module.exports = (env, argv) => {
  config.plugins = [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
      title: 'Boilterplate',
      inject: 'body',
    }),
    new webpack.DefinePlugin({
      __DEVELOPMENT__: argv.mode === 'development',
      __VERSION__: '1.0',
    }),
  ]

  if (argv.mode === 'development') {
    config.plugins.concat([new webpack.HotModuleReplacementPlugin()])
  }

  if (argv.mode === 'production') {
    config.plugins.concat([new webpack.optimize.AggressiveMergingPlugin()])
  }

  return config
}
