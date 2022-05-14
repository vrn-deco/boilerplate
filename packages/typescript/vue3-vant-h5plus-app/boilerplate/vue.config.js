const { resolve } = require('path')
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  publicPath: './',
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      require('unplugin-auto-import/webpack')({
        imports: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
        resolve: [require('unplugin-vue-components/resolvers').VantResolver()],
        eslintrc: {
          enabled: true,
          filepath: resolve(__dirname, '.eslintrc-auto-import.json'),
          globalsPropValue: true,
        },
      }),
      require('unplugin-vue-components/webpack')({
        resolvers: [require('unplugin-vue-components/resolvers').VantResolver()],
        dts: true,
      }),
    ],
  },
})
