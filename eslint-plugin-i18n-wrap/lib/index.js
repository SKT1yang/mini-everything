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

// 直接合并成一个module.exports
module.exports = {
  configs: {
    // add your configs here
    base: require('./configs/base'),
  },
  rules: requireIndex(__dirname + "/rules"),
  processors: {
    // add your processors here
  }
}

