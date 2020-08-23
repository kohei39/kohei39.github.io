module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
    "vue/max-attributes-per-line": "off",
    "arrow-parens": "off",
    "space-before-function-paren": "off",
    "no-unused-vars": "off",
  }
}
