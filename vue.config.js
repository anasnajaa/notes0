module.exports = {
    pwa: {
      name: 'My App',
      themeColor: '#4DBA87',
      msTileColor: '#000000',
      appleMobileWebAppCapable: 'yes',
      appleMobileWebAppStatusBarStyle: 'black',
      workboxPluginMode: 'GenerateSW',
      workboxOptions: {
        //swSrc: 'public/service-worker.js',
      }
    }
  }