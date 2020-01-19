const dotenv = require('dotenv')
const e = require('envalid')
const { pick } = require('lodash')
const path = require('path')
const version = require('../package.json').version
const fs = require('fs')
const envFile = process.env.NODE_ENV === 'production' ? '.env' : '.env.dev'
// const envFile = '.env'
let parsed = {}
try {
  parsed = dotenv.parse(fs.readFileSync(path.resolve(__dirname, '..', envFile)))
} catch (e) {
  console.log('Cannot load env file')
}

const validators = {
  APP_NAME: e.str({
    default: 'Electron Experiment',
  }),
  APP_ENV: e.str({
    default: 'production',
  }),
}

const clean = e.cleanEnv(parsed, validators)
module.exports = {
  ...pick(clean, Object.keys(validators)),
  version,
}
