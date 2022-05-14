module.exports = {
  root: true,
  extends: ['@ombro/eslint-config-vue3-typescript', '.eslintrc-auto-import.json'],
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'vue/multi-word-component-names': 'off',
  },
}
