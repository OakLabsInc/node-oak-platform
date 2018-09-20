const { join } = require('path')
const OakPlatform = require(join(__dirname, '..'))

async function go () {
  let platform = await new OakPlatform({
    host: process.env.HOST
  })
  let host = await platform.host()
  host.info(undefined, function (err, hostInfo) {
    if (err) throw err
    console.log('\n* Host info:', JSON.stringify(hostInfo, null, 2), '\n')
  })
}

go()
