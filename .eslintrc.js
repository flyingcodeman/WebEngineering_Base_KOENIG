module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'prettier'],
    extends: [
      'standard-with-typescript',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
      'prettier',
    ],
    parserOptions: {
      project: './tsconfig.json',
    },
    rules: {
      // Add any project-specific ESLint rules here
    },
  };