module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'plugin:vue/recommended',
    'plugin:prettier/recommended'
  ],
  // required to lint *.vue files
  plugins: [
    'vue',
    'prettier',
    'import'
  ],
  // add your custom rules here
  rules: {
    'import/no-relative-parent-imports': 'error', // 不允许使用相对路径import，推荐使用波浪线写法，例如import xxx from '~/components/xxx'
    'no-console': process.env.NODE_ENV === 'production' ? ['error', { allow: ['error'] }] : 'off', // 线上环境关闭console.log和console.warn等
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/html-self-closing': ['error', {
      html: {
        normal: 'never',
        void: 'never',
        component: 'always' // Don't enforce self-closing style.
      },
      svg: 'always'
    }],
    "vue/html-closing-bracket-newline": ["error", {
      "multiline": "never"
    }],
    'no-undef': 'error',
    'no-unused-vars': ['error', {
      vars: 'all', // 检测所有变量，包括全局环境中的变量
      args: 'after-used', // 不检查最后一个使用的参数之前出现的未使用的位置参数，但是检查最后一个使用的参数之后的所有命名参数和所有位置参数
      ignoreRestSiblings: true, // Rest语法糖时候可以忽略兄弟`unused`警告，例如const { type, ...coords } = data，允许`type`
      argsIgnorePattern: '^_',
      caughtErrors: 'none',
    }],
    'prefer-const': ['error'],
  },
}
