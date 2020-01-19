import { BrowserWindow } from 'electron'

export let mainWindow = null
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

export function destroyMainWindow () { mainWindow = null }
export function getMainWindow (create = false) {
  if (mainWindow === null && create) return createWindow()
  return mainWindow
}
export function createWindow () {
  mainWindow = new BrowserWindow({
    height: 563,
    minHeight: 563,
    useContentSize: true,
    width: 1000,
    // icon: nativeImage.createFromDataURL(logo),
    minWidth: 1000,
    backgroundColor: '#018DE4',
    webPreferences: {
      nodeIntegration: true,
      webSecurity: process.env.NODE_ENV === 'production'
    },
  })

  mainWindow.loadURL(winURL).then(async () => {
    console.log('Window loaded')
    // await store.dispatch('auth/setUser', undefined)
  })
  return mainWindow
}

export function send (channel, ...args) {
  getMainWindow().webContents.send(channel, ...args)
}
