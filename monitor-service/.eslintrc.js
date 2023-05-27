module.exports = {
  env: {
    browser: true,
    jest: true,
    commonjs: true,
    es2021: true
  },
  extends: 'standard',
  overrides: [
    {
      files: [
        '**/*.test.js'
      ],
      env: {
        jest: true
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
  }
}
