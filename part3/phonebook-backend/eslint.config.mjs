import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginReact from 'eslint-plugin-react'
import js from '@eslint/js'
import stylisticJs from '@stylistic/eslint-plugin-js'

export default [
  js.configs.recommended,
  { files: ['**/*.{js,mjs,cjs,jsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  { ignores: ['dist/**/*'] },
  { plugins: {
    '@stylistic/js': stylisticJs,
    '@eslint-plugin-react': pluginReact,
    'react': pluginReact
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    '@stylistic/js/indent': [
      'error',
      2
    ],
    '@stylistic/js/linebreak-style': [
      'error',
      'unix'
    ],
    '@stylistic/js/quotes': [
      'error',
      'single'
    ],
    '@stylistic/js/semi': [
      'error',
      'never'
    ],
    'eqeqeq': 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': [
      'error', 'always'
    ],
    'arrow-spacing': [
      'error', { 'before': true, 'after': true },
    ],
    'no-console': 'off',
    'no-unused-vars': 'off',
    'no-undef': 'off',
  },
  },
]
