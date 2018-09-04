const { join } = require('path')
const OakPlatform = require(join(__dirname, '..'))

async function go () {
  let platform = await new OakPlatform({
    host: process.env.HOST
  })
  console.log('Platform methods:')
  Object.keys(platform).forEach(v => {
    console.log(`* ${v}`)
    Object.keys(platform[v].proto).forEach(v => console.log(`  * ${v}`))
  })
}

go()
