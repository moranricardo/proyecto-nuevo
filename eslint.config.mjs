/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import js from '@eslint/js';
import globals from 'globals';
import typescriptEslint from 'typescript-eslint';

export default [
  {
    name: 'Global Ignores',
    ignores: [
      '**/node_modules/',
      '**/dist/',
      '**/build/',
      '**/.tmp/',
      '**/coverage/',
      '**/.DS_Store',
      '**/npm-debug.log*'
    ],
  },
  js.configs.recommended,
  {
    name: 'General JavaScript & Node rules',
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-console': 'off',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'prefer-const': 'error',
      'no-var': 'error',
      eqeqeq: ['error'],
    },
  },
  ...typescriptEslint.configs.recommended.map(config => {
    return {
      ...config,
      files: ['**/*.ts', '**/*.cts', '**/*.mts'],
    };
  }),
];
