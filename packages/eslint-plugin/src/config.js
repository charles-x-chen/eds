/**
 * @package     BlueAcorn/PresetEslint
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
const path = require('path');
const commerceDir = path.dirname(require.resolve('@blueacorn/commerce/package.json'));

module.exports = {
    extends: ['plugin:storybook/recommended', 'plugin:github/recommended', 'plugin:github/react', 'preact'],
    rules: {
        'filenames/match-regex': 'off',
        'storybook/no-uninstalled-addons': 'off',
        'import/order': 'error',
        'import/no-unresolved': ['error', { ignore: ['^virtual:'] }],
    },
    settings: {
        'import/resolver': {
            alias: {
                extensions: ['.js', '.jsx'],
                map: [['~', `${commerceDir}/src`]],
            },
        },
        jest: {
            version: 26,
        },
    },
    overrides: [
        {
            files: ['*.jsx', '*.js'],
        },
        {
            files: ['*.test.jsx', '*.test.js'],
            rules: {
                'i18n-text/no-en': 'off',
            },
        },
        {
            files: ['*.gql'],
            extends: 'plugin:@graphql-eslint/operations-recommended',
            parserOptions: {
                schema: `${commerceDir}/schema/*.graphql`,
                operations: `${commerceDir}/src/**/*.gql`,
            },
            rules: {
                '@graphql-eslint/require-id-when-available': 'off',
                '@graphql-eslint/selection-set-depth': 'off',
            },
        },
    ],
};
