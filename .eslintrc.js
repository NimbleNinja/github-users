module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended",
        'airbnb-base',
        "prettier"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        'import/extensions': 0,
        'no-console': 0,
        'no-alert': 0,
        'react/prop-types': 0,
        'import/no-unresolved': 0,
        'global-require': 0,
        'class-methods-use-this': 0,
        'import/no-extraneous-dependencies': 0,
        'arrow-body-style': 0,
        'prefer-arrow-callback': 1,
        'prefer-default-export': 0,
        'no-unused-vars': 0,
        'exhaustive-deps': 0
    }
}
