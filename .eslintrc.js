// eslint-disable-next-line no-undef
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    'quotes': ['error', 'single'],
    'semi': ['off'],
    'comma-dangle': ['error', 'never'],
    'no-console': 'off',
    'indent': ['warn', 2],
    'space-before-function-paren': ['error', 'always'],
    'space-before-blocks': 'error',
    'keyword-spacing': 'error',
    'space-infix-ops': ['error', { int32Hint: false }],
    'eqeqeq': 'error',
    'comma-spacing': ['error', {
      'before': false,
      'after': true
    }],
    'brace-style': 'error',
    'curly': 'error',
    'camelcase': 'error',
    'comma-style': 'error',
    'dot-location': 'error',
    'eol-last': 'error',
    'func-call-spacing': 'error',
    'object-curly-spacing': ['error', 'always'],
    'key-spacing': ['error', {
      'beforeColon': false,
      'afterColon': true
    }],
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'no-lone-blocks': 'error',
    'block-spacing': 'error',
    'no-multi-spaces': 'error',
    'no-unreachable': 'error',
    'object-property-newline': 'error',
    'space-in-parens': 'error',
    'object-curly-newline': ['error', { multiline: true }],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-namespace': 'off'
  }
}
