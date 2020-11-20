const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './',
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@config', resolve('config'))
      .set('@libs', resolve('src/libs'))
      .set('@api', resolve('src/api'))
      .set('@components', resolve('src/components'))
      .set('@views', resolve('src/views'))
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        "productName": "nodejs",
        "appId": "com.fund",
        "directories": {
          "output": "build"
        },
        "win": {
          "target": "portable"
        },
        "mac": {
          "artifactName": "${productName}_setup_${version}.${ext}",
          "extendInfo": {
            "CFBundleURLSchemes": [
              "electron"
            ]
          }
        }
      },
      nodeIntegration: true,
      externals: ['superagent'],
      nodeModulesPath: ['../../node_modules', './node_modules']
    }
  }
}