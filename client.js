const { join } = require('path')
const OakPlatform = require(join(__dirname))

async function go () {
  let platform = await new OakPlatform({
    host: 'localhost:443'
  })
  let host = await platform.host()
  host.info(undefined, function (err, hostInfo) {
    if (err) throw err
    console.log('Host info:', hostInfo)
  })
}

go()
