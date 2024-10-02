// @ts-check
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const eslintConfigPrettier = require('eslint-config-prettier');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = tseslint.config(
    {
        files: ['**/*.ts'],
        extends: [
            eslint.configs.recommended,
            ...tseslint.configs.recommended,
            ...tseslint.configs.stylistic,
            ...angular.configs.tsRecommended,
        ],
        processor: angular.processInlineTemplates,
        rules: {
            '@typescript-eslint/no-namespace': ['error', { allowDeclarations: true }],
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    args: 'all',
                    argsIgnorePattern: '^_',
                    caughtErrors: 'all',
                    caughtErrorsIgnorePattern: '^_',
                    destructuredArrayIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    ignoreRestSiblings: true,
                },
            ],
            '@angular-eslint/directive-selector': [
                'error',
                {
                    type: 'attribute',
                    prefix: 'app',
                    style: 'camelCase',
                },
            ],
            '@angular-eslint/component-selector': [
                'error',
                {
                    type: 'element',
                    prefix: 'fm',
                    style: 'kebab-case',
                },
            ],
        },
        ignores: ['node_modules/', '.git/', '.vscode/', 'dist/'],
    },
    {
        files: ['**/*.html'],
        extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
        rules: {},
        ignores: ['src/index.html'],
    },
    eslintConfigPrettier,
    eslintPluginPrettierRecommended
);
