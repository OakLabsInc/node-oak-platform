const { join } = require('path')
const OakPlatform = require(join(__dirname, '..'))

async function go () {
  let platform = await new OakPlatform({
    host: process.env.HOST
  })
  let app = await platform.application()
  app.viewLive(undefined, function (err, live) {
    if (err) throw err
    console.log('\n* Live App:', JSON.stringify(live, null, 2))
  })
}

go()
