import type { Linter } from 'eslint'

declare const plugin: {
  rules: Record<string, any>
  configs: Record<string, Linter.FlatConfig>
}

export = plugin
