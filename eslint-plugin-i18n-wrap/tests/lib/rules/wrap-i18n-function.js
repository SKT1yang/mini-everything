/**
 * @fileoverview 存在未被国际化包裹的中文
 * @author yangguodong
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/wrap-i18n-function"),
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
ruleTester.run("wrap-i18n-function", rule, {
  valid: [
    // give me some code that won't trigger a warning
    { code: 't("中文")' },
    { code: 'const name = t("中文");' },
    { code: 'const age = 18;' },
    { code: 'const persion = { name: t("中文") };' },

    // .vue
    {
      filename: 'test.vue',
      code: "<template><div>{{t('中文')}}</div></template>",
    },
    {
      filename: 'test.vue',
      code: "<template><div :label=\"t('中文')\"></div></template>",
    },
  ],

  invalid: [
    {
      code: "'中文';",
      output: `t('中文');`,
      errors: [{ messageId: "unwrap" }],
    },
    // 一般字符串
    {
      code: "const name = '中文';",
      output: "const name = t('中文');",
      errors: [{ messageId: "unwrap" }],
    },
    // 模板字符串
    {
      code: "const name = `中文`;",
      output: "const name = t('中文');",
      errors: [{ messageId: "unwrap" }],
    },
    // 模板字符串中包含变量
    {
      code: "const name = `中${'文本' ? true : false }文`;",
      output: "const name = t('中{}文', '文本' ? true : false);",
      errors: [{ messageId: "unwrap" }, { messageId: "unwrap" }],
    },
    // 对象包含字符串
    {
      code: "const persion = { name: '中文' };",
      output: "const persion = { name: t('中文') };",
      errors: [{ messageId: "unwrap" }],
    },
    // 数组包含字符串
    {
      code: "const persion = ['中文'];",
      output: "const persion = [t('中文')];",
      errors: [{ messageId: "unwrap" }],
    },

    /**
     * vue
     */

    /* 普通文本 */
    {
      filename: 'test.vue',
      code: "<template><div>中文</div></template>",
      output: "<template><div>{{t('中文')}}</div></template>",
      errors: [{ messageId: "unwrap" }],
    },
    /* 插值表达式 */
    {
      filename: 'test.vue',
      code: "<template><div>{{'中文' ? true : false}}</div</template>",
      output: "<template><div>{{t('中文') ? true : false}}</div</template>",
      errors: [{ messageId: "unwrap" }],
    },
    {
      filename: 'test.vue',
      code: "<template><div>{{`中文` ? true : false}}</div</template>",
      output: "<template><div>{{t('中文') ? true : false}}</div</template>",
      errors: [{ messageId: "unwrap" }],
    },
    {
      filename: 'test.vue',
      code: "<template><div>文本1{{`中文`}}文本2</div></template>",
      output: "<template><div>{{t('文本1')}}{{t('中文')}}{{t('文本2')}}</div></template>",
      errors: [{ messageId: "unwrap" }, { messageId: "unwrap" }, { messageId: "unwrap" }],
    },
    /* 属性 */
    {
      filename: 'test.vue',
      // 静态属性
      code: `<template><div title="中文"></div></template>`,
      output: `<template><div :title="t('中文')"></div></template>`,
      errors: [{ messageId: "unwrap" }],
    },
    {
      filename: 'test.vue',
      // v-bind
      code: "<template><div v-bind:title=\"'中文'\"></div></template>",
      output: "<template><div v-bind:title=\"t('中文')\"></div></template>",
      errors: [{ messageId: "unwrap" }],
    },
    {
      filename: 'test.vue',
      // 动态属性 纯文本
      code: "<template><div :title=\"'中文'\"></div></template>",
      output: "<template><div :title=\"t('中文')\"></div></template>",
      errors: [{ messageId: "unwrap" }],
    },
    {
      filename: 'test.vue',
      // 动态属性 三元表达式
      code: "<template><div :title=\"'中文' > 0 ? true : false\"></div></template>",
      output: "<template><div :title=\"t('中文') > 0 ? true : false\"></div></template>",
      errors: [{ messageId: "unwrap" }],
    },
    {
      filename: 'test.vue',
      // 动态属性  箭头函数
      code: "<template><div :title=\"() => '中文'\"></div></template>",
      output: "<template><div :title=\"() => t('中文')\"></div></template>",
      errors: [{ messageId: "unwrap" }],
    },
    // v-if
    {
      filename: 'test.vue',
      code: `<template><div v-if="a === 1 ? '新增' : '修改' "></div></template>`,
      output: `<template><div v-if="a === 1 ? t('新增') : t('修改') "></div></template>`,
      errors: [{ messageId: "unwrap" }, { messageId: "unwrap" }],
    },
    {
      filename: 'test.vue',
      code: `<template><div v-if="'新增'"></div></template>`,
      output: `<template><div v-if="t('新增')"></div></template>`,
      errors: [{ messageId: "unwrap" }],
    },
    // v-show
    {
      filename: 'test.vue',
      code: `<template><div v-show="a === 1 ? '新增' : '修改' "></div></template>`,
      output: `<template><div v-show="a === 1 ? t('新增') : t('修改') "></div></template>`,
      errors: [{ messageId: "unwrap" }, { messageId: "unwrap" }],
    },

    /* jsx */
    {
      filename: 'test.tsx',
      // 插值表达式
      code: `export default defineComponent({setup() {return () => <div>中文</div>;},});`,
      output: `export default defineComponent({setup() {return () => <div>{t('中文')}</div>;},});`,
      errors: [{ messageId: "unwrap" }],
    },
    {
      filename: 'test.tsx',
      // 静态属性
      code: `export default defineComponent({setup() {return () => <div name="中文"></div>}})`,
      output: `export default defineComponent({setup() {return () => <div name={t('中文')}></div>}})`,
      errors: [{ messageId: "unwrap" }],
    },
    {
      filename: 'test.tsx',
      // 动态属性
      code: `export default defineComponent({setup() {return () => <div name={'中文'.length > 0 ? true : false}></div>}})`,
      output: `export default defineComponent({setup() {return () => <div name={t('中文').length > 0 ? true : false}></div>}})`,
      errors: [{ messageId: "unwrap" }],
    },
  ],
});
