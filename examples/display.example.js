const { join } = require('path')
const OakPlatform = require(join(__dirname, '..'))

async function go () {
  let platform = await new OakPlatform({
    host: process.env.HOST || 'localhost:443'
  })

  let display = await platform.display()

  display.info(undefined, function (err, displayInfo) {
    if (err) return console.log('* Display info error:', err.message)
    console.log('* Display info:')
    console.log(JSON.stringify(displayInfo, null, 2))
  })
}

go()
