module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2017,
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react", 
        "ava"
    ],
    "rules": {
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            1,
            "single"
        ],
        "max-len": 1,
        "semi": [
            1,
            "always"
        ],
        "no-unused-vars": [
            0, 
            {
                "args": "none"
            }
        ],
        "no-console": 0,
        "ava/assertion-arguments": "error",
        "ava/max-asserts": ["off", 5],
        "ava/no-async-fn-without-await": "error",
        "ava/no-cb-test": "off",
        "ava/no-duplicate-modifiers": "error",
        "ava/no-identical-title": "error",
        "ava/no-ignored-test-files": "error",
        "ava/no-invalid-end": "error",
        "ava/no-nested-tests": "error",
        "ava/no-only-test": "error",
        "ava/no-skip-assert": "error",
        "ava/no-skip-test": "error",
        "ava/no-statement-after-end": "error",
        "ava/no-todo-implementation": "error",
        "ava/no-todo-test": "warn",
        "ava/no-unknown-modifiers": "error",
        "ava/prefer-async-await": "error",
        "ava/prefer-power-assert": "off",
        "ava/test-ended": "error",
        "ava/test-title": ["error", "if-multiple"],
        "ava/use-t-well": "error",
        "ava/use-t": "error",
        "ava/use-test": "error",
        "ava/use-true-false": "error"
    }
}