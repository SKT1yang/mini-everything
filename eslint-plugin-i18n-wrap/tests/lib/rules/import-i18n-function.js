/**
 * @fileoverview 自动导入国际化包裹函数
 * @author yangguodong
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/import-i18n-function"),
  RuleTester = require("eslint").RuleTester;



//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  languageOptions: {
    parser: require('vue-eslint-parser'),
    parserOptions: {
      parser: require('@typescript-eslint/parser'),
      sourceType: "module",
      ecmaVersion: 2020,
    }
  }
})
ruleTester.run("import-i18n-function", rule, {
  valid: [
    // // es
    // { code: `const name = "中文";` },
    // { code: `import { t } from "@/entry/languages/useLanguage";\nconst name = t("中文");` },

    // // vue
    // {
    //   filename: 'test.vue',
    //   code: `<template><div>中文</div></template>`,
    // },
    // {
    //   filename: 'test.vue',
    //   code: `<template><div>{{t('中文')}}</div></template><script>import { t } from "@/entry/languages/useLanguage";</script>`,
    // },
  ],

  invalid: [
    {
      filename: 'test.js',
      code: "const name = t('中文');",
      output: `import { t } from "@/entry/languages/useLanguage";const name = t('中文');`,
      errors: [{ messageId: "unimport" }],
    },
    {
      filename: 'test.vue',
      code: `<template><div>{{t('中文')}}</div></template>`,
      output: `<script>import { t } from "@/entry/languages/useLanguage";</script><template><div>{{t('中文')}}</div></template>`,
      errors: [{ messageId: "unimport" }],
    },
    {
      filename: 'test.vue',
      code: `<template><div>{{t('中文')}}</div></template><script></script>`,
      output: `<template><div>{{t('中文')}}</div></template><script>import { t } from "@/entry/languages/useLanguage";</script>`,
      errors: [{ messageId: "unimport" }],
    },
  ],
});
