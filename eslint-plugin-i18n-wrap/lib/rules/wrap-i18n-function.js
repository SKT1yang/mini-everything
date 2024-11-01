/**
 * @fileoverview 存在未被国际化包裹的中文
 * @author yangguodong
 */
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
      unwrap: "存在未被国际化包裹的中文",
    }, // Add messageId and message
  },

  create(context) {
    // variables should be defined here

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    /**
     * 函数判断一个字符串是否包含中文字符
     * @param {string} str 
     * @returns 
     */
    function hasChinese(str) {
      return /[\u4e00-\u9fa5]/.test(str);
    }

    function isUnwrap(node) {
      switch (node.type) {
        case "Literal":
          {
            const not_t_function = node.parent.type === "CallExpression" && node.parent.callee.name !== "t"
            return typeof node.value === "string" && hasChinese(node.value) && (node.parent.type !== "CallExpression" || not_t_function)
          }
        case "TemplateLiteral":
          // 遍历TemplateLiteral的elements，判断是否有中文字符
          {
            const not_t_function = node.parent.type === "CallExpression" && node.parent.callee.name !== "t"
            return node.quasis.some(quasi => hasChinese(quasi.value.raw)) && (node.parent.type !== "CallExpression" || not_t_function)
          }

        default:
          return false
      }


    }
    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      // visitor functions for different types of nodes

      // 字符串字面量
      Literal(node) {
        // 已经被 函数名为t 包裹的字符串字面量，不需要处理
        if (node.parent.type === "CallExpression" && node.parent.callee.name === "t") {
          return;
        }
        // 父节点为模板字面量，不需要处理
        if (node.parent.type === "TemplateLiteral") {
          return;
        }
        if (typeof node.value === "string" && hasChinese(node.value) && isUnwrap(node)) {
          context.report({
            node,
            messageId: "unwrap",
            fix(fixer) {
              return fixer.replaceText(node, `t('${node.value}')`)
            }
          });
        }
      },
      // 模板字符串字面量
      TemplateLiteral(node) {
        // 已经被 函数名为t 包裹的字符串字面量，不需要处理
        if (node.parent.type === "CallExpression" && node.parent.callee.name === "t") {
          return;
        }
        if (isUnwrap(node)) {
          context.report({
            node,
            messageId: "unwrap",
            fix(fixer) {
              let text = ''
              let expressionIndex = 0
              node.quasis.forEach((quote) => {
                if (quote.value.raw) {
                  text += quote.value.raw
                }
                if (node.expressions.length && expressionIndex < node.expressions.length) {
                  const item = node.expressions[expressionIndex]
                  switch (item.type) {
                    case "Identifier":
                      text += "${" + item.name + "}"
                      break;
                    case "Literal":
                      text += "${" + item.raw + "}"
                      break;
                  }
                  expressionIndex++
                }
              })
              // 考虑有expression 变量的模板字符串
              return fixer.replaceText(node, `t(\`${text}\`)`)
            }
          });
        }
      }
    };
  },
};
