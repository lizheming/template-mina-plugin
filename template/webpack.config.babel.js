import webpack from 'webpack'
import { resolve, dirname, basename } from 'path'
import MinaEntryPlugin from '@tinajs/mina-entry-webpack-plugin'
import MinaRuntimePlugin from '@tinajs/mina-runtime-webpack-plugin'

const isProduction = process.env.NODE_ENV === 'production'

const loaders = {
  script: 'babel-loader',
  style: {
    loader: 'postcss-loader',
    options: {
      config: {
        path: resolve('./postcss.config.js'),
      },
    },
  },
}

export default [
  'plugin/plugin.mina',
  'miniprogram/app.mina'
].map(entry => {
  const context = resolve('src', dirname(entry));
  const dist = resolve('dist', dirname(entry));
  entry = basename(entry);

  return {
    context,
    entry,
    output: {
      path: dist,
      filename: '[name]',
      publicPath: '/',
      globalObject: 'wx'
    },
    module: {
      rules: [
        {
          test: /\.mina$/,
          exclude: /node_modules/,
          use: [{
            loader: '@tinajs/mina-loader',
            options: {
              loaders,
            },
          }],
        },
        {
          test: /\.mina$/,
          include: /node_modules/,
          use: '@tinajs/mina-loader',
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: loaders.script,
        },
        {
          test: /\.(css|wxss)$/,
          exclude: /node_modules/,
          use: loaders.style,
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/,
          use: {
            loader: "file-loader",
            options: {
              name: 'assets/[name].[hash:6].[ext]',
            },
          },
        },
        {
          test: /\.wxs$/,
          use: {
            loader: "file-loader",
            options: {
              name: "wxs/[name].[hash:6].[ext]"
            }
          },
        },
      ],
    },
    resolve: {
      symlinks: true,
    },
    plugins: [
      new webpack.EnvironmentPlugin({
        NODE_ENV: 'development',
        DEBUG: false,
      }),
      new MinaEntryPlugin({
        map: entry => ['es6-promise/dist/es6-promise.auto.js', entry],
      }),
      new MinaRuntimePlugin({
        runtime: './runtime.js',
      }),
    ],
    optimization: {
      splitChunks: {
        chunks: 'all',
        name: 'common.js',
        minChunks: 2,
        minSize: 0,
      },
      runtimeChunk: {
        name: 'runtime.js'
      },
    },
    mode: isProduction ? 'production' : 'none'
  };
});
