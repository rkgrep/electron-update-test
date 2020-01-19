const dotenv = require('dotenv')
const { build } = require('../package.json')
const { notarize } = require('electron-notarize');
const fs = require('fs')
const path = require('path')
const envFile = '.env'
const parsed = dotenv.parse(fs.readFileSync(path.resolve(__dirname, '..', envFile)))

exports.default = async function notarizing(context) {
  const { electronPlatformName, appOutDir } = context;
  if (electronPlatformName !== 'darwin') {
    return;
  }

  const appName = context.packager.appInfo.productFilename;

  const appleId = parsed.APPLE_ID

  return await notarize({
    appBundleId: build.appId,
    appPath: `${appOutDir}/${appName}.app`,
    appleId,
    appleIdPassword: parsed.APPLE_ID_PASSWORD,
  })
}
