module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    '@babel/plugin-proposal-export-default-from',
    ['@babel/plugin-proposal-pipeline-operator', { proposal: 'smart' }],
    ['import', { libraryName: 'ant-design-vue', libraryDirectory: 'es', style: true }],
  ],
}
