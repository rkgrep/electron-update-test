import { app } from 'electron'
import { createWindow, getMainWindow, mainWindow, send } from './mainWindow'

console.log('App', app)

app.on('second-instance', (event, commandLine, workingDirectory) => {
  // Кто-то пытался запустить второй экземпляр, мы должны сфокусировать наше окно.
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore()
    mainWindow.focus()
  }
})

app.on('ready', async () => {
  console.log('App ready')
  createWindow()
  const { default: updater } = require('./updater')
  try {
    await updater.checkForUpdates()
  } catch (e) {
    console.log('Check update error', e)
  }
  console.log('All ready')
})

app.on('window-all-closed', () => {
  console.log('All windows closed.')
  app.quit()
  // if (process.platform !== 'darwin') {
  // }
})

app.on('activate', () => {
  if (getMainWindow() === null) createWindow()
})
