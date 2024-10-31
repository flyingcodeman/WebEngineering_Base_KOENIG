import js from '@eslint/js';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

import path from 'path';
import { fileURLToPath } from 'url';

// Define __dirname and __filename in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  {
    ignores: ['node_modules', 'dist', '.eslintrc.js'],
  },
  // Base JavaScript Configuration
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...js.environments.browser.globals,
        ...js.environments.es2021.globals,
      },
    },
    ...js.configs.recommended,
  },
  // TypeScript Configuration
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...js.environments.browser.globals,
        ...js.environments.es2021.globals,
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      // TypeScript ESLint Recommended Rules
      ...typescriptPlugin.configs.recommended.rules,
      // TypeScript ESLint Rules Requiring Type Checking
      ...typescriptPlugin.configs['recommended-requiring-type-checking'].rules,
      // Prettier Config
      ...prettierConfig.rules,
      'prettier/prettier': 'error',
    },
  },
];
