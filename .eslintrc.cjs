module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'plugin:react/recommended',
    'standard'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.js'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react'],
  rules: {
    "quotes": ["error", "single"],
    "object-curly-spacing": ["error", "always"],
    "react/prop-types": ["error"],
    "semi": ["error", "always"],
    "space-before-function-paren": ["error", "never"],
    "comma-dangle": ["error", "always-multiline"],
    "camelcase": "error",
    "jsx-quotes": ["error", "prefer-single"],
    "react/function-component-definition": [
      "error",
      {
        "namedComponents": "function-declaration"
      }
    ],
  },
};
