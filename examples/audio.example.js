const { join } = require('path')
const OakPlatform = require(join(__dirname, '..'))

async function go () {
  let platform = await new OakPlatform({
    host: process.env.HOST || 'localhost:443'
  })

  let audio = await platform.audio()

  audio.info(undefined, function (err, audioInfo) {
    if (err) return console.log('* Display info error:', err.message)
    console.log('* Audio info:')
    console.log(JSON.stringify(audioInfo, null, 2))
  })
}

go()
