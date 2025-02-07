# 自动导入国际化包裹函数 (`i18n-wrap/import-i18n-function`)

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

Please describe the origin of the rule here.

## Rule Details

This rule aims to...

Examples of **incorrect** code for this rule:

```js

// fill me in

```

Examples of **correct** code for this rule:

```js

// fill me in

```

### Options

If there are any options, describe them here. Otherwise, delete this section.

```js

  auto: {
    type: 'boolean',
    default: false, // 默认值
    description: '是否自动导入国际化包裹函数',
  },
  pathSuffix: {
    type: 'string',
    default: DEFAULT_PATH_SUFFIX, // 默认值
    description: '国际化包裹函数的路径后缀',
  },
  srcAlias: {
    type: 'string',
    default: DEFAULT_SRC_ALIAS, // 默认值
    description: '源代码的别名',
  },
  staticEntry: {
    type: 'string',
    default: DEFAULT_STATIC_ENTRY, // 默认值
    description: '静态资源的入口文件',
  },

```

## When Not To Use It

Give a short description of when it would be appropriate to turn off this rule.

## Further Reading

If there are other links that describe the issue this rule addresses, please include them here in a bulleted list.
