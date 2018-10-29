const { join } = require('path')
const OakPlatform = require(join(__dirname, '..'))

async function go () {
  let platform = await new OakPlatform({
    host: process.env.HOST || 'localhost:443'
  })

  let auto = await platform.automatic()

  console.log(auto, auto.__proto__)

  auto.generate(undefined, function (err, autoGenerate) {
    if (err) return console.log('* Automatic generate error:', err.message)
    console.log('* Automatic generate:')
    console.log(JSON.stringify(autoGenerate, null, 2))
  })
}

go()
