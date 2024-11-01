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

const ruleTester = new RuleTester();
ruleTester.run("wrap-i18n-function", rule, {
  valid: [
    // give me some code that won't trigger a warning
    { code: 't("中文")' },
    { code: 'const name = t("中文");' },
    { code: 'const age = 18;' },
    { code: 'const persion = { name: t("中文") };' }
  ],

  invalid: [
    {
      code: "'中文';",
      output: "t('中文');",
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
      output: "const name = t(`中文`);",
      errors: [{ messageId: "unwrap" }],
    },
    // 模板字符串中包含变量
    {
      code: "const name = `中${1}文`;",
      output: "const name = t(`中${1}文`);",
      errors: [{ messageId: "unwrap" }],
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
    }
  ],
});
