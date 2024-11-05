const path = require('path')
/**
 * Register the given visitor to parser services.
 * If the parser service of `vue-eslint-parser` was not found,
 * this generates a warning.
 *
 * @param {RuleContext} context The rule context to use parser services.
 * @param {TemplateListener} templateBodyVisitor The visitor to traverse the template body.
 * @param {RuleListener} [scriptVisitor] The visitor to traverse the script.
 * @param { { templateBodyTriggerSelector: "Program" | "Program:exit" } } [options] The options.
 * @returns {RuleListener} The merged visitor.
 */
function defineTemplateBodyVisitor(
  context,
  templateBodyVisitor,
  scriptVisitor,
  options
) {
  const sourceCode = context.getSourceCode()
  if (sourceCode.parserServices.defineTemplateBodyVisitor == null) {
    const filename = context.getFilename()
    if (path.extname(filename) === '.vue') {
      context.report({
        loc: { line: 1, column: 0 },
        message:
          'Use the latest vue-eslint-parser. See also https://eslint.vuejs.org/user-guide/#what-is-the-use-the-latest-vue-eslint-parser-error.'
      })
    }
    return {}
  }
  return sourceCode.parserServices.defineTemplateBodyVisitor(
    templateBodyVisitor,
    scriptVisitor,
    options
  )
}

/**
 * 函数判断一个字符串是否包含中文字符
 * @param {string} str
 * @returns
 */
function hasChinese(str) {
  return /[\u4e00-\u9fa5]/.test(str);
}

/**
 * @template T
 * @param {T} visitor
 * @param {...(TemplateListener | RuleListener | NodeListener)} visitors
 * @returns {T}
 */
function compositingVisitors(visitor, ...visitors) {
  for (const v of visitors) {
    for (const key in v) {
      // @ts-expect-error
      if (visitor[key]) {
        // @ts-expect-error
        const o = visitor[key]
        // @ts-expect-error
        visitor[key] = (...args) => {
          o(...args)
          // @ts-expect-error
          v[key](...args)
        }
      } else {
        // @ts-expect-error
        visitor[key] = v[key]
      }
    }
  }
  return visitor
}



module.exports = {
  /**
   * Register the given visitor to parser services.
   * If the parser service of `vue-eslint-parser` was not found,
   * this generates a warning.
   *
   * @param {RuleContext} context The rule context to use parser services.
   * @param {TemplateListener} templateBodyVisitor The visitor to traverse the template body.
   * @param {RuleListener} [scriptVisitor] The visitor to traverse the script.
   * @param { { templateBodyTriggerSelector: "Program" | "Program:exit" } } [options] The options.
   * @returns {RuleListener} The merged visitor.
   */
  defineTemplateBodyVisitor,
  hasChinese,
  compositingVisitors,
}
