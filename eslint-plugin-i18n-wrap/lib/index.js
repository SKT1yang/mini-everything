/**
 * @fileoverview 国际化包裹翻译函数
 * @author yangguodong
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

const plugin = {
  configs: {},
  rules: requireIndex(__dirname + "/rules"),
};

// assign configs here so we can reference `plugin`
Object.assign(plugin.configs, {
  recommended: {
    plugins: {
      i18n: plugin
    },
    rules: {
      "i18n/wrap-i18n-function": "error",
      "i18n/import-i18n-function": "error",
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
  all: {
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
  ignores: {
    ignores: ["**/languages/"]
  },
});

// 直接合并成一个module.exports
module.exports = plugin

