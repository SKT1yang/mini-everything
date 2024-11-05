/**
 * @fileoverview 存在未被国际化包裹的中文
 * @author yangguodong
 */
const generate = require('escodegen').generate;
const utils = require("../utils")


"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "problem", // `problem`, `suggestion`, or `layout`
    docs: {
      description: "存在未被国际化包裹的中文",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: "code", // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
    messages: {
      unwrap: `存在未被国际化函数包裹的中文, 类型: '{{type}}', 值:'{{value}}'`,
    }, // Add messageId and message
  },

  create(context) {

    // variables should be defined here

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    /**
     * 判断节点是否需要国际化包裹
     * @param {Literal | TemplateLiteral | VText | VExpressionContainer | VLiteral | VAttribute | VDirective | JSXText} node
     * @returns
     */
    function isUnwrap(node) {
      let result = false
      switch (node.type) {
        case "Literal":
          {
            const not_t_function = node.parent.type === "CallExpression" && node.parent.callee.name !== "t"
            result = typeof node.value === "string" && utils.hasChinese(node.value) && (node.parent.type !== "CallExpression" || not_t_function)
            break
          }

        case "TemplateLiteral":
          {
            result = node.quasis.some(quasi => utils.hasChinese(quasi.value.raw))
            break
          }

        case "VLiteral":
          {
            result = typeof node.value === "string" && utils.hasChinese(node.value)
            break
          }

        case "VText":
          {
            result = typeof node.value === "string" && utils.hasChinese(node.value)

          }
          break
        case "VAttribute":
          {
            // 静态属性
            if (node.key.type === 'VIdentifier' && node.value && node.value.type === 'VLiteral') {
              return typeof node.value.value === "string" && utils.hasChinese(node.value.value)
            }
            result = false

          }
          break
        case "JSXText":
          result = typeof node.value === "string" && utils.hasChinese(node.value)
          break
        default:
          result = false
      }
      return result
    }

    /**
     * 获取es节点监听器
     * @description 包括jsx节点
     * @returns {TemplateListener}
     */
    function getEsNodeListener() {
      return {
        // 字符串字面量
        Literal(node) {
          // console.log('****Literal****\n', node.type, '\n', node.value, '\n')
          if (isUnwrap(node)) {
            context.report({
              node,
              messageId: "unwrap",
              fix(fixer) {
                if (node.parent.type === 'JSXAttribute') {
                  return fixer.replaceText(node, `{t('${node.value}')}`)
                } else {
                  return fixer.replaceText(node, `t('${node.value}')`)
                }
              },
              data: {
                value: String(node.value),
                type: node.type,
              }
            });
          }
        },
        // 模板字符串字面量
        TemplateLiteral(node) {
          // console.log('****TemplateLiteral****\n', node.type, '\n', node.quasis, '\n')
          if (isUnwrap(node)) {
            context.report({
              node,
              messageId: "unwrap",
              fix(fixer) {
                let text = node.quasis.map((quasi) => {
                  return quasi.value.raw
                }).join('{}')
                // 将模版字符串中表达式原文 提取出来
                let expressions = node.expressions.map(exp => {
                  let sourceCode = context.getSourceCode()
                  return sourceCode.text.slice(exp.range[0], exp.range[1])
                })
                if (expressions.length > 0) {
                  // 考虑有expression 变量的模板字符串
                  return fixer.replaceText(node, `t('${text}', ${expressions.join(',')})`)
                } else {
                  return fixer.replaceText(node, `t('${text}')`)
                }
              },
              data: {
                value: generate(node),
                type: node.type,
              }
            });
          }
        },

        JSXText(node) {
          // console.log('****JSXText****\n', node.type, '\n', node.value, '\n')
          if (isUnwrap(node)) {
            context.report({
              node,
              messageId: "unwrap",
              fix(fixer) {
                return fixer.replaceText(node, `{t('${node.value}')}`)
              },
              data: {
                value: String(node.value),
                type: node.type,
              }
            });
          }
        },

      }
    }

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    const vueRuleListener = utils.defineTemplateBodyVisitor(context, {
      VText(node) {
        // console.log('****VText****\n', node.type, '\n', node.value, '\n')
        if (isUnwrap(node)) {
          context.report({
            node,
            messageId: "unwrap",
            fix(fixer) {
              return fixer.replaceText(node, `{{t('${node.value}')}}`)
            },
            data: {
              value: String(node.value),
              type: node.type,
            }
          });
        }
      },

      VAttribute(node) {
        // console.log('sourceCode', context?.sourceCode?.text)
        // console.log('****VAttribute****\n', node, '\n')
        if (node === null) {
          return;
        }

        if (isUnwrap(node) && node.key.type === 'VIdentifier' && node.value && node.value.type === 'VLiteral') {
          context.report({
            node,
            messageId: "unwrap",
            fix(fixer) {
              if (node.value && node.value.type === 'VLiteral') {
                return fixer.replaceText(node, `:${node.key.name}="t('${node.value.value}')"`)
              } else {
                return null
              }
            },
            data: {
              value: `${node.key.name}="${node.value.value}"`,
              type: node.type,
            }
          });
        }
      },
      ...getEsNodeListener()
    })

    return {
      // visitor functions for different types of nodes
      ...vueRuleListener,
      ...getEsNodeListener()
    };
  },
};
