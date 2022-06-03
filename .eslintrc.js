module.exports = {
  plugins: ['react', 'import', 'react-hooks', 'prettier'],
  extends: ['plugin:prettier/recommended'],
  env: {
    browser: true,
    node: true,
    jest: true,
    mocha: true,
    jasmine: true,
  },
  rules: {
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-restricted-exports': 'off',
    'prettier/prettier': 'warn',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'react-hooks/exhaustive-deps': 'error',
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      settings: {
        'import/resolver': {
          typescript: {},
        },
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 2018,
        sourceType: 'module',
        project: './tsconfig.json',
        tsconfigRootDir: './',
      },
      plugins: ['react', '@typescript-eslint'],
    },
    {
      files: ['**/*.test.tsx'],
      rules: {
        'react/jsx-props-no-spreading': 'off',
      },
    },
  ],
};
