process.env.NODE_ENV = 'test'

const test = require('tape')
const { join } = require('path')
let plat = false

test('test oak-platform module', function (t) {
  t.doesNotThrow(function () {
    plat = require(join(__dirname, '..'))
  }, 'oak-platform should be requirable')

  (async function () {
    let platform = new OakPlatform()
    console.log(await platform.protos())
  })()
})
