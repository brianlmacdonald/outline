module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
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
        "comma-style": [2, "first"],
        "no-console": 0
    }
}