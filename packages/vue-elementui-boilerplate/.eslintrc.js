module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  rules: {
    'space-before-function-paren': ['error', 'never'],
    semi: ['error', 'never'],
    'keyword-spacing': [
      'error',
      {
        overrides: {
          // if: { after: false },
          // for: { after: false },
          // while: { after: false }
        },
      },
    ],
    'comma-dangle': [0, 'always-multiline'],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
  globals: {
    // 暴露全局变量
    NT_CONFIG: true,
    plus: true,
  },
}
