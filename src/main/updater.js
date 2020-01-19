import { autoUpdater } from 'electron-updater'
import { ipcMain } from 'electron'
import { send } from './mainWindow'

autoUpdater.autoDownload = false

let cancellationToken = null

autoUpdater.on('update-downloaded', () => {
  try {
    autoUpdater.quitAndInstall()
  } catch (e) {
    send('update-failed', e)
  }
})

autoUpdater.on('update-available', info => {
  send('update-available', info)
})

ipcMain.on('update-start', () => {
  if (!cancellationToken) cancellationToken = autoUpdater.downloadUpdate()
})

autoUpdater.on('download-progress', info => {
  send('update-progress', info)
})

export default autoUpdater
