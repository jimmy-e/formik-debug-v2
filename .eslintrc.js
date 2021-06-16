module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  env: {
    browser: true,
  },
  overrides: [
    {
      files: ['*.test.*'],
      env: {
        jest: true,
      },
    },
  ],
  plugins: [
    '@babel',
    '@typescript-eslint',
    'import',
    'jsx-max-len',
    'simple-import-sort',
  ],
  extends: [
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
  ],
  globals: {
    // tests
    page: true,
    browser: true,
    describe: true,
    beforeAll: true,
    beforeEach: true,
    afterAll: true,
    afterEach: true,
    it: true,
    test: true,
    expect: true,
    global: true,
  },
  rules: {
    // ----- REACT ----- //
    'react/destructuring-assignment': 0,
    'react/display-name': 0,
    'react/jsx-closing-bracket-location': 1,
    'react/jsx-curly-newline': 0, // handled by prettier
    'react/jsx-indent': 'off',
    'react/jsx-one-expression-per-line': 0, // unnecessary rule
    'react/jsx-props-no-spreading': 0, // Allow prop spreading
    'react/jsx-wrap-multilines': ['error', { arrow: true, return: true, declaration: true }],
    'react/no-array-index-key': 0, // index keys are fine when used correctly
    'react/no-unused-prop-types': 0, // Fails on SFC which GoogleMapReact is, etc.
    'react/prop-types': 0, // Don't use prop types, use Typescript
    'react/require-default-props': 0,

    // ----- JSX ----- //
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'jsx-a11y/label-has-for': 0, // good eventually, but not now
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-max-len/jsx-max-len': [2, { lineMaxLength: 100, tabWidth: 2, maxAttributesPerLine: 1 }],

    // ----- TYPESCRIPT ----- //
    '@typescript-eslint/ban-types': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0, // Eventually turn these back on
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/no-empty-interface': 0,
    '@typescript-eslint/no-explicit-any': 0, // For now allow 'any'
    '@typescript-eslint/no-inferrable-types': 0,
    '@typescript-eslint/no-redeclare': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/prefer-as-const': 0,
    '@typescript-eslint/prefer-optional-chain': 'error',

    // ----- IMPORTS ----- //
    'import/first': 'error',
    'import/named': 0, // doesn't play well with Typescript
    'import/newline-after-import': 'error',
    // This doesn't work with the aliases we've set up, plus I believe Typescript catches this
    // anyways
    'import/no-unresolved': 0,
    'import/prefer-default-export': 0,

    // ----- OTHER ----- //
    'array-bracket-spacing': 0, // ['error', 'always'],
    'arrow-parens': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    // Always enforce curly braces around if/else blocks; https://eslint.org/docs/rules/curly
    curly: 'error',
    'implicit-arrow-linebreak': 0, // this conflicts with lines that are too long
    indent: 'off',
    'no-alert': 0,
    'no-case-declarations': 0,
    'no-console': ['error', { allow: ['warn', 'error'] }], // allow warnings and error logs
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    // GraphQL relies on an internal variable, __typename, with a dangling underscore.
    'no-underscore-dangle': ['error', { allow: ['__typename'] }],
    // Use the babel/eslint plugin to handle optional changing something like a?.foo() would
    // raise a linting error before
    'no-unused-expressions': 0,
    // I *think* that the typescript compiler catches unused variables, plus this complaints about
    // imported types
    'no-unused-vars': 0,
    'object-curly-spacing': ['error', 'always'],
    'prefer-destructuring': 0,
    quotes: 'off',
    semi: ['error', 'always'],
  },
};
