import { Configuration } from 'webpack'
import { join } from 'path'

export function webpackPresetConfig(config: Configuration) {
  const gooberAlias = {
    goober: [join(process.cwd(), 'node_modules/goober')],
  }

  if (!config.resolve) {
    config.resolve = {}
  }
  if (!config.resolve.alias) {
    config.resolve.alias = gooberAlias
  } else {
    Object.assign(config.resolve.alias, gooberAlias)
  }

  return config
}
