module.exports = {
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: {
    parser: require.resolve("@typescript-eslint/parser"),
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2020,
  },
  env: {
    browser: true,
    es6: true
  },
  plugins: ['vue'],
  rules: {
    'vue/comment-directive': 'error',
    'vue/jsx-uses-vars': 'error'
  }
}
