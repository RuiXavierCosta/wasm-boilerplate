const path = require('path')

module.exports = {
  webpack(config) {
    config.output.webassemblyModuleFilename = 'wasm/[modulehash].wasm'
    config.experiments = { asyncWebAssembly: true }
    return config
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}