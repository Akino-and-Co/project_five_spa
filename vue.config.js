module.exports = {
  configureWebpack: {
    // No need for splitting
    optimization: {
      splitChunks: false
    }
  },
  pluginOptions: {
    quasar: {
      theme: 'ios',
      rtlSupport: true,
      importAll: true
    }
  },
  transpileDependencies: [
    /[\\\/]node_modules[\\\/]quasar-framework[\\\/]/
  ]
}
