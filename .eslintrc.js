module.exports = {
  'env': { 'es6': true, 'node': true },
  'extends': 'eslint:recommended',
  'parserOptions': { 'sourceType': 'module' },
  'rules': {
    'indent': [ 'error', 2 ],
    'linebreak-style': [ 'error', 'unix' ],
    'quotes': [ 'error', 'single' ],
    'semi': [ 'warn', 'never' ],
    'no-unused-vars': [ 'warn' ],
    'no-console': [ process.env.NODE_ENV === 'production' ? 'error' : 'warn' ]
  }
};
