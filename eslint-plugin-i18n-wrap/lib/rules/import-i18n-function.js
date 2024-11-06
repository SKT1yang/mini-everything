/**
 * @fileoverview 自动导入国际化包裹函数
 * @author yangguodong
 */
"use strict";
const utils = require("../utils")
const { getAllPackageJsonInfo } = require("../utils/getPackageJsonCache")

// 缓存存储所有找到的 package.json 路径
/** @type {Array<{path: string, content: object}>} */
let allPackageJsonInfo = []

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
    schema: [], // Add a schema if the rule has options
    messages: {
      unimport: "存在国际化函数调用但未引入该函数"
    }, // Add messageId and message
  },

  create(context) {
    // variables should be defined here
    // 获取当前文件名、文件路径信息
    const filename = context.getFilename()
    const rootDir = context.getCwd && context.getCwd()
    // console.log('filename:', filename)
    // console.log('cwd:', cwd)

    let needImportFunction = false
    let functionImported = false

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
        // Program: async function () {
        //   if (rootDir) {
        //     if (allPackageJsonInfo.length === 0) {
        //       // 获取所有 package.json 文件的路径
        //       allPackageJsonInfo = await getAllPackageJsonInfo(rootDir);
        //       console.log('Found package.json files:', allPackageJsonInfo.length, typeof allPackageJsonInfo);
        //     }
        //   }
        // },
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
              // 输出所有找到的 package.json 路径
              // console.log('exit Found package.json files:', allPackageJsonInfo.length, typeof allPackageJsonInfo);
              // allPackageJsonInfo.forEach((filePath) => {
              //   console.log(filePath);
              // });
              if (node.tokens.length === 0) {
                return fixer.insertTextBefore(node, `<script setup>import { t } from "@/entry/languages/useLanguage";</script>`)
              } else {
                return fixer.insertTextBefore(node, `import { t } from "@/entry/languages/useLanguage";`)
              }

            },
          })
        }
      }
    });
  },
};
