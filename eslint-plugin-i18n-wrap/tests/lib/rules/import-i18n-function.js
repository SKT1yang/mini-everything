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
    // es
    { code: `const name = "中文";` },
    { code: `import { t } from "@/entry/languages/useLanguage";\nconst name = t("中文");` },

    // vue
    {
      filename: 'test.vue',
      code: `<template><div>中文</div></template>`,
    },
    {
      filename: 'test.vue',
      code: `<template><div>{{t('中文')}}</div></template><script>import { t } from "@/entry/languages/useLanguage";</script>`,
    },
  ],

  invalid: [
    // 默认引入结果
    {
      filename: 'test.js',
      code: "const name = t('中文');",
      output: `import { t } from "@/languages";\nconst name = t('中文');`,
      errors: [{ messageId: "unimport" }],
    },
    // 默认引入结果
    {
      filename: 'test.js',
      code: "const name = t('中文');",
      output: `import { t } from "#/languages";\nconst name = t('中文');`,
      errors: [{ messageId: "unimport" }],
      options: [{ srcAlias: '#' }],
    },
    // 路径后缀
    {
      filename: 'test.js',
      code: "const name = t('中文');",
      output: `import { t } from "@/languages/useLanguage";\nconst name = t('中文');`,
      errors: [{ messageId: "unimport" }],
      options: [{ pathSuffix: '/useLanguage.ts' }],
    },
    // 静态entry + 路径后缀
    {
      filename: 'test.js',
      code: "const name = t('中文');",
      output: `import { t } from "@/entry/languages/useLanguage";\nconst name = t('中文');`,
      errors: [{ messageId: "unimport" }],
      options: [{ staticEntry: 'entry/languages', pathSuffix: '/useLanguage.ts' }],
    },
    // 自动引入 + 路径后缀
    {
      filename: 'test.js',
      code: "const name = t('中文');",
      output: `import { t } from "./src/entry/languages/useLanguage";\nconst name = t('中文');`,
      errors: [{ messageId: "unimport" }],
      options: [{ auto: true, pathSuffix: '/useLanguage.ts' }],
    },
    {
      filename: 'test.vue',
      code: `<template><div>{{t('中文')}}</div></template>`,
      output: `<script setup>import { t } from "@/languages";</script><template><div>{{t('中文')}}</div></template>`,
      errors: [{ messageId: "unimport" }],
    },
    {
      filename: 'test.vue',
      code: `<template><div>{{t('中文')}}</div></template><script></script>`,
      output: `<template><div>{{t('中文')}}</div></template><script>import { t } from "@/languages";\n</script>`,
      errors: [{ messageId: "unimport" }],
    },
    {
      filename: 'test.vue',
      code: `<template><div>{{t('中文')}}</div></template><script>const b = 1;</script>`,
      output: `<template><div>{{t('中文')}}</div></template><script>import { t } from "@/languages";\nconst b = 1;</script>`,
      errors: [{ messageId: "unimport" }],
    },
  ],
});
