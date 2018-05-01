module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 2017,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: 'module'
  },
  plugins: ['react', 'ava', 'flowtype'],
  rules: {
    'linebreak-style': ['error', 'unix'],
    quotes: [1, 'single'],
    'max-len': 1,
    semi: [1, 'always'],
    'no-unused-vars': [
      0,
      {
        args: 'none'
      }
    ],
    'no-console': 0,
    'ava/assertion-arguments': 'error',
    'ava/max-asserts': ['off', 5],
    'ava/no-async-fn-without-await': 'error',
    'ava/no-cb-test': 'off',
    'ava/no-duplicate-modifiers': 'error',
    'ava/no-identical-title': 'error',
    'ava/no-ignored-test-files': 'error',
    'ava/no-invalid-end': 'error',
    'ava/no-nested-tests': 'error',
    'ava/no-only-test': 'error',
    'ava/no-skip-assert': 'error',
    'ava/no-skip-test': 'error',
    'ava/no-statement-after-end': 'error',
    'ava/no-todo-implementation': 'error',
    'ava/no-todo-test': 'warn',
    'ava/no-unknown-modifiers': 'error',
    'ava/prefer-async-await': 'error',
    'ava/prefer-power-assert': 'off',
    'ava/test-ended': 'error',
    'ava/test-title': ['error', 'if-multiple'],
    'ava/use-t-well': 'error',
    'ava/use-t': 'error',
    'ava/use-test': 'error',
    'ava/use-true-false': 'error',
    'flowtype/boolean-style': [2, 'boolean'],
    'flowtype/define-flow-type': 1,
    'flowtype/delimiter-dangle': [2, 'never'],
    'flowtype/generic-spacing': [2, 'never'],
    'flowtype/no-primitive-constructor-types': 2,
    'flowtype/no-types-missing-file-annotation': 2,
    'flowtype/no-weak-types': 2,
    'flowtype/object-type-delimiter': [2, 'comma'],
    'flowtype/require-parameter-type': 2,
    'flowtype/require-return-type': [
      2,
      'always',
      {
        annotateUndefined: 'never'
      }
    ],
    'flowtype/require-valid-file-annotation': 2,
    'flowtype/semi': [2, 'always'],
    'flowtype/space-after-type-colon': [2, 'always'],
    'flowtype/space-before-generic-bracket': [2, 'never'],
    'flowtype/space-before-type-colon': [2, 'never'],
    'flowtype/type-id-match': [2, '^([A-Z][a-z0-9]+)+Type$'],
    'flowtype/union-intersection-spacing': [2, 'always'],
    'flowtype/use-flow-type': 1,
    'flowtype/valid-syntax': 1
  },
  "settings": {
    "flowtype": {
      "onlyFilesWithFlowAnnotation": true
    }
  }
};
