process.env.NODE_ENV = 'test'

const test = require('tape')
const { join } = require('path')
const OakPlatform = require(join(__dirname, '..'))

// test('test oak-platform module', function (t) {
//   t.doesNotThrow(function () {
//     plat = require(join(__dirname, '..'))
//   }, 'oak-platform should be requirable')
// })
