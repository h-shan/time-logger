// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  "extends": "eslint:recommended",
  "globals": {
    "Promise": 1,
    "process": 1,
    "Uint8Array": 1
  },
  // add your custom rules here
  'rules': {
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,


    // Don't get mad, get glad!
    "no-console":[ 0 ],
    "prefer-const": ["error", {
      "destructuring": "any",
      "ignoreReadBeforeAssign": false
    }],
    "no-var": ["error"],
    "prefer-arrow-callback": ["error"],
    "object-shorthand": ["error"],
    "no-duplicate-imports": ["error"],
    "no-iterator": ["error"],
    "dot-notation": ["error"],
    "no-plusplus": ["error"],
    "eqeqeq": ["error"],
    "no-nested-ternary": ["error"],
    "no-unneeded-ternary": ["error"],
    "space-infix-ops": ["error"],
    "indent": [
      1,
      2,
      {"SwitchCase": 1}
    ],
    "quotes": [
      1,
      "single"
    ],
    "no-alert":0,
    "no-param-reassign":0,
    "no-mixed-operators": 0,
    "no-lonely-if": 0
  }
}
