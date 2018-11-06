const { join } = require('path')
const OakPlatform = require(join(__dirname, '..'))
const _ = require('lodash')

async function go () {
  let platform = await new OakPlatform({
    host: process.env.HOST
  })

  console.log('Platform methods:')
  Object.keys(platform).forEach(v => {
    console.log(`* ${v}`)
    Object.keys(platform[v].definition).forEach(v => {
      console.log(`  * ${v}`)
    })
    let upper = _.startCase(v).replace(/\s/g, '')
    if (platform[v].definition[upper]) {
      Object.keys(platform[v].definition[upper].service).forEach(v => {
        console.log(`    * ${v}`)
      })
    }
  })
}

go()
