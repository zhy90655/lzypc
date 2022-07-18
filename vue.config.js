const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = defineConfig({
  productionSourceMap: process.env.NODE_ENV !== 'production',
  devServer: {
    proxy: {
      '/api/getcls': {
        target: 'http://47.242.54.179:8081',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api/getcls': ''
        },
        headers: {
          Connection: 'keep-alive'
        }
      },
      '/api': {
        target: 'http://192.168.0.106:9999',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        },
        headers: {
          Connection: 'keep-alive'
        }
      }
    }
  },
  transpileDependencies: true,
  // 配置elementui
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        process: 'process/browser.js',
        Buffer: ['buffer', 'Buffer']
      }),
      new NodePolyfillPlugin(),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  },
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: '龙之源'
    }
  }
})
