import 'source-map-support/register'
import { app } from "electron"
require('browser-env')(['window', 'navigator'])


if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

const gotTheLock = process.env.NODE_ENV !== 'development' ? app.requestSingleInstanceLock() : true

if (!gotTheLock) {
  console.log('Cannot get the lock')
  app.quit()
} else {
  console.log('Got the lock')
  require('./app')
}
