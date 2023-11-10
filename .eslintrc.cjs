/* eslint-env node */
module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/stylistic',
        'plugin:@typescript-eslint/recommended-type-checked',
        'plugin:playwright/recommended',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
    },
    plugins: ['@typescript-eslint'],
    root: true,
    parserOptions: {
        project: true,
    //     tsconfigRootDir: __dirname,
    },
    rules: {
        // '@typescript-eslint/no-floating-promises': 'error',
        'no-control-regex': 0,
    },
};
