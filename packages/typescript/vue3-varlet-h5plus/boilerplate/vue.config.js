const { resolve } = require('path')
const { defineConfig } = require('@vue/cli-service')
const autoImport = require('unplugin-auto-import/webpack')
const components = require('unplugin-vue-components/webpack')
const { VarletUIResolver } = require('unplugin-vue-components/resolvers')

module.exports = defineConfig({
  publicPath: './',
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      autoImport({
        imports: ['vue', 'vue-router', 'pinia'],
        eslintrc: {
          enabled: true,
          filepath: resolve(__dirname, '.eslintrc-auto-import.json'),
          globalsPropValue: true,
        },
      }),
      components({
        resolvers: [VarletUIResolver()],
        dts: true,
      }),
    ],
  },
})
