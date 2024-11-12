/**
 * @fileoverview 自动导入国际化包裹函数
 * @author yangguodong
 */
"use strict";
const utils = require("../utils")
const path = require('path');
const { findNearestPackageJson, getRelativePathTolanguagePath } = require("../utils/getPackageJsonCache")

const DEFAULT_PATH_SUFFIX = ''
const DEFAULT_SRC_ALIAS = '@'

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'problem', // `problem`, `suggestion`, or `layout`
    docs: {
      description: "自动导入国际化包裹函数",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: 'code', // Or `code` or `whitespace`
    schema: [
      // 定义配置项
      {
        type: 'object',
        properties: {
          auto: {
            type: 'boolean',
            default: false, // 默认值
          },
          pathSuffix: {
            type: 'string',
            default: DEFAULT_PATH_SUFFIX, // 默认值
          },
          srcAlias: {
            type: 'string',
            default: DEFAULT_SRC_ALIAS, // 默认值
          },
        },
        additionalProperties: false,
      },
    ], // Add a schema if the rule has options
    messages: {
      unimport: "存在国际化函数调用但未引入该函数"
    }, // Add messageId and message
  },

  create(context) {
    // variables should be defined here
    // 获取当前文件名、文件路径信息
    const filename = context.getFilename()
    // const rootDir = context.getCwd && context.getCwd()
    // console.log('filename:', filename)
    // console.log('cwd:', cwd)

    const options = context.options[0] || {};
    const auto = options.auto || false;
    const pathSuffix = options.pathSuffix || DEFAULT_PATH_SUFFIX;
    const srcAlias = options.srcAlias || DEFAULT_SRC_ALIAS;

    let needImportFunction = false
    let functionImported = false
    /** @type {{voerkai18n?: {entry: string}, dependencies?: {'@voerkai18n/runtime': string}} }*/
    let packageJson = {}
    let packageJsonPath = ""
    /** @type {{entry: string} }*/
    let voerkai18n = {
      entry: "languages"
    }
    /** @type {{'@voerkai18n/runtime'?: string} }*/
    let dependencies = {}

    if (auto) {
      const packageJsonInfo = findNearestPackageJson(filename) || { packageJson: {}, packageJsonPath: "" }
      packageJson = packageJsonInfo.packageJson
      packageJsonPath = packageJsonInfo.packageJsonPath
      voerkai18n = packageJson?.voerkai18n || {
        entry: "languages"
      }
      dependencies = packageJson?.dependencies || {}
    }

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    /**
     * 获取es节点监听器
     * @description 包括jsx节点
     * @returns {TemplateListener}
     */
    function getEsNodeListener() {
      return {
        CallExpression(node) {
          // console.log("**********CallExpression**********")
          // @ts-ignore
          if (node.callee.name === 't') {
            needImportFunction = true
          }
        },
        ImportSpecifier(node) {
          // console.log("**********ImportSpecifier**********")
          if (node.local.name === 't') {
            functionImported = true
          }
        },
      }
    }


    return utils.compositingVisitors(utils.defineTemplateBodyVisitor(context, getEsNodeListener(), getEsNodeListener(), {
      templateBodyTriggerSelector: "Program",
    }), {
      ...getEsNodeListener(),
      "Program:exit"(node) {
        // console.log("Program:exit", needImportFunction, functionImported)
        if (needImportFunction && !functionImported) {
          context.report({
            node,
            messageId: 'unimport',
            fix(fixer) {
              // 用户voerkai18n配置，前后不带 '/'
              let entry = voerkai18n.entry ? 'languages' : voerkai18n.entry
              let sourcePath = `${srcAlias}/${entry}${pathSuffix}`
              if (auto && dependencies?.["@voerkai18n/runtime"]) {
                let entityEntry = `${entry}${pathSuffix}`
                let result = getRelativePathTolanguagePath(filename, `${path.dirname(packageJsonPath)}/src/${entityEntry}`)
                if (result) {
                  if (!sourcePath.startsWith('.') && !sourcePath.startsWith('/')) {
                    // 如果路径不是相对路径，则添加./
                    sourcePath = `./${sourcePath}`
                  }
                }
              }
              // 删除后缀ts
              sourcePath = sourcePath.replace(/\.ts$/, '')
              if (node.tokens.length === 0) {
                return fixer.insertTextAfter(node, `<script setup>import { t } from "${sourcePath}";</script>`)
              } else {
                return fixer.insertTextBefore(node, `import { t } from "${sourcePath}";\n`)
              }

            },
          })
        }
      }
    });
  },
};
