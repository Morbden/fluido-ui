import { Configuration } from 'webpack'
import { join } from 'path'

export function webpackPresetConfig(config: Configuration) {
  const alias = {
    react: [join(process.cwd(), 'node_modules/react')],
    'react-dom': [join(process.cwd(), 'node_modules/react-dom')],
    'framer-motion': [join(process.cwd(), 'node_modules/framer-motion')],
  }

  if (!config.resolve) {
    config.resolve = {}
  }
  if (!config.resolve.alias) {
    config.resolve.alias = alias
  } else {
    Object.assign(config.resolve.alias, alias)
  }

  return config
}
