module.exports = {
    env: {
        es6: true,
        browser: true,
        node: true,
        commonjs: true,
        amd: true
    },
    extends: ['eslint:recommended', 'plugin:prettier/recommended'],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
        parser: 'babel-eslint'
    },
    plugins: ['prettier'],
    rules: {
        'prettier/prettier': 'error',
        indent: ['error', 4],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['never', 'always']
    }
};
