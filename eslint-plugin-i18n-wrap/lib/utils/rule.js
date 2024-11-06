const utils = require("../utils")
/**
 * 判断文本节点是否需要国际化包裹
 * @param {Literal} node
 * @returns
 */
function checkLiteralIsUnwrap(node) {
  // 必须包含中文
  if (typeof node.value === "string" && utils.hasChinese(node.value)) {
    // 判断父节点是否是函数，并且函数名为t
    if (node.parent.type === "CallExpression" && node.parent.callee.type === 'Identifier' && node.parent.callee.name === "t") {
      return false
    }

    if (isConsole(node)) {
      return false
    }

    return true
  }
  else {
    return false
  }
}

/**
 * 判断模版字符串节点是否需要国际化包裹
 * @param {TemplateLiteral} node
 * @returns
 */
function checkTemplateLiteralIsUnwrap(node) {
  // 必须包含中文
  if (node.quasis.some(quasi => utils.hasChinese(quasi.value.raw))) {
    // 判断父节点是否是函数，并且函数名为t
    if (node.parent.type === "CallExpression" && node.parent.callee.type === 'Identifier' && node.parent.callee.name === "t") {
      return false
    }

    if (isConsole(node)) {
      return false
    }

    return true
  }
  else {
    return false
  }
}

/**
 * console 不应该被国际化包裹
 * @param {Literal | TemplateLiteral} node
 * @returns
 */
function isConsole(node) {
  if (node.parent.type === 'CallExpression' && node.parent.callee.type === 'MemberExpression' && node.parent.callee.object.type === 'Identifier' && node.parent.callee.object.name === 'console') {
    return true
  }
  return false
}

module.exports = {
  checkLiteralIsUnwrap,
  checkTemplateLiteralIsUnwrap,
  isConsole
}
