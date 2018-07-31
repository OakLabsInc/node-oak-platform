process.env.NODE_ENV = 'test'

const test = require('tape')
const { join } = require('path')
const OakPlatform = require(join(__dirname, '..'))
