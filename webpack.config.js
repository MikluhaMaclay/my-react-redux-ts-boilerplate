const webpack = require('webpack')
const path = require('path')

const HtmlWebPackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const postcssPresetEnv = require('postcss-preset-env')
const CopyPlugin = require('copy-webpack-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')

const config = {
  entry: './index.js',

  output: {
    path: path.resolve(__dirname, 'build')
  },

  optimization: {
    minimizer: [
      new TerserPlugin()
    ],
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

      // {
      //   test: /\.module.s(a|c)ss$/,
      //   use: [
      //     {
      //       loader: 'style-loader',
      //     },
      //     {
      //       loader: 'postcss-loader',
      //       options: {
      //         ident: 'postcss',
      //         plugins: () => [postcssPresetEnv()],
      //       },
      //     },
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         modules: true,
      //         localIdentName: '[name]__[local]___[hash:base64:5]',
      //         camelCase: true,
      //       },
      //     },
      //     {
      //       loader: 'sass-loader',
      //     },
      //   ],
      // },

      {
        test: /(\.scss|\.css)$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [postcssPresetEnv()],
            },
          },
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
    extensions: ['.js', '.ts', '.tsx', '.scss', '.sass'],
    alias: {
      Utils: path.resolve(__dirname, 'src/utils'),
      Components: path.resolve(__dirname, 'src/components'),
      Assets: path.resolve(__dirname, 'src/assets'),
      'react-dom': '@hot-loader/react-dom'
    }
  },

  devServer: {
    contentBase: path.join(__dirname, 'build'),
    compress: true,
    port: 8080
  },

  performance: {
    // hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }

}

module.exports = (env, argv) => {
  config.plugins = [
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: './index.html',
      title: 'Boilterplate',
      inject: 'body',
    }),

    new webpack.DefinePlugin({
      __DEVELOPMENT__: argv.mode === 'development',
      __VERSION__: '1.0',
    }),

    new CopyPlugin([
      { from: './public/manifest.json', to: './'},
      { from: './public/favicon.ico', to: './'}
    ])
  ]

  // DEV
  if (argv.mode === 'development') {
    config.plugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new CircularDependencyPlugin({
        exclude: /a\.js|node_modules/,
        failOnError: false
      })
    ])

    config.output = {
      ...config.output,
      filename: '[name].js',
      chunkFilename: '[name].chunk.js'
    }

    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all'
      }
    }

  }
  // PROD
  if (argv.mode === 'production') {
    config.plugins.concat([new webpack.optimize.AggressiveMergingPlugin()])

    config.output = {
      ...config.output,
      filename: '[name].[chunkhash].js',
      chunkFilename: '[name].[chunkhash].chunk.js'
    }
    
    config.optimization = {
      ...config.optimization,
      sideEffects: true,
      concatenateModules: true,
      nodeEnv: 'production',
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: 10,
        minSize: 0
      }
    }
  }

  return config
}
