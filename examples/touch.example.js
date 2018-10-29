const { join } = require('path')
const OakPlatform = require(join(__dirname, '..'))

async function go () {
  let platform = await new OakPlatform({
    host: process.env.HOST || 'localhost:443'
  })

  let touch = await platform.touch()

  touch.info(undefined, function (err, touchInfo) {
    if (err) return console.log('* Touch info error:', err.message)
    console.log('* Touch info:')
    console.log(JSON.stringify(touchInfo, null, 2))
  })
}

go()
