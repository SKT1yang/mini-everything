# eslint-plugin-i18n-wrap

国际化包裹翻译函数

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
import i18n-wrap from "eslint-plugin-i18n-wrap";

export default [
    {
        plugins: {
            i18n-wrap
        }
    }
];
```


Then configure the rules you want to use under the `rules` key.

```js
import i18n-wrap from "eslint-plugin-i18n-wrap";

export default [
    {
        plugins: {
            i18n-wrap
        },
        rules: {
            "i18n-wrap/rule-name": "warn"
        }
    }
];
```



## Configurations

<!-- begin auto-generated configs list -->
TODO: Run eslint-doc-generator to generate the configs list (or delete this section if no configs are offered).
<!-- end auto-generated configs list -->



## Rules

<!-- begin auto-generated rules list -->
TODO: Run eslint-doc-generator to generate the rules list.
<!-- end auto-generated rules list -->


