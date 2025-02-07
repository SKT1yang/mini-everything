# eslint-plugin-i18n-wrap

ESLint plugin of the international wrap translation function

## feature

- Automatically import translation functions
- Wrap translation functions in the code
- support js、mjs、cjs、ts、tsx、vue files

## warning

- Currently, the plugin is a customized VoerkaI18n plugin, and it will be made universal in the future

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-i18n-wrap`:

```sh
npm install eslint-plugin-i18n-wrap --save-dev
```

## Usage

In your [configuration file](https://eslint.org/docs/latest/use/configure/configuration-files#configuration-file), import the plugin `eslint-plugin-i18n-wrap` and add `i18n-wrap` to the `plugins` key:

```js
import i18nWrap from 'eslint-plugin-i18n-wrap';

export default [
  {
    plugins: {
      i18n: plugin
    },
    rules: {
      "i18n/wrap-i18n-function": "error",
      "i18n/import-i18n-function": ["error", { auto: true }],
    },
    files: ["**/*.{js,mjs,cjs,ts,tsx,vue}"],
    languageOptions: {
      parser: require("vue-eslint-parser"),
      parserOptions: {
        parser: require("@typescript-eslint/parser"),
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 2020,
      },
    },
  },
  {
    ignores: ["**/languages/"]
  },
];
```

Or use the built-in configuration:

```js
import i18nWrap from 'eslint-plugin-i18n-wrap';

export default [
  i18nWrap.configs.all,
]
```

Then configure the rules you want to use under the `rules` key.

```js
import i18n-wrap from "eslint-plugin-i18n-wrap";

export default [
    {
      plugins: {
        i18n: plugin
      },
      rules: {
        "i18n/wrap-i18n-function": "error",
        "i18n/import-i18n-function": ["error", { auto: true }],
      },
    }
];
```

### rule [import-i18n-function] Options:

```js
  auto: {
    type: 'boolean',
    default: false, // 默认不自动导入
    description: '是否自动导入国际化包裹函数',
  },
  pathSuffix: {
    type: 'string',
    default: '',
    description: '国际化包裹函数的路径后缀',
  },
  srcAlias: {
    type: 'string',
    default: '@',
    description: 'src的别名',
  },
  staticEntry: {
    type: 'string',
    default: 'languages',
    description: '入口文件夹路径',
  },

```

## Configurations

<!-- begin auto-generated configs list -->

|    | Name          |
| :- | :------------ |
| 🌐 | `all`         |
|    | `ignores`     |
| ✅  | `recommended` |

<!-- end auto-generated configs list -->

## Rules

<!-- begin auto-generated rules list -->

🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).

| Name                                                       | Description  | 🔧 |
| :--------------------------------------------------------- | :----------- | :- |
| [import-i18n-function](docs/rules/import-i18n-function.md) | 自动导入国际化包裹函数  | 🔧 |
| [wrap-i18n-function](docs/rules/wrap-i18n-function.md)     | 存在未被国际化包裹的中文 | 🔧 |

<!-- end auto-generated rules list -->
