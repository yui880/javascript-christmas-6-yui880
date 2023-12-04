module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  extends: ['airbnb-base', 'prettier'],
  overrides: [
    {
      env: {
        node: true,
        jest: true
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  ignorePatterns: ["__tests__/"],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'max-depth': ['error', 2],
    'max-params': ['error', 3],
    'max-lines-per-function': ['error', { max: 15 }],
    'import/extensions': ["error", "always", { "ignorePackages": true }],
    'class-methods-use-this': ["off"],
  },
};
