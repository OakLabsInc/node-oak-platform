const {join} = require('path')
const OakPlatform = require(join(__dirname, '..'))

async function go () {
  let platform = await new OakPlatform({
      host: process.env.HOST
  })

  let app = await platform.application()

  app.logs({}, function (err) {
      console.log('- ERROR', err)
  })
  .on('data', function (data) {
    const out = data.loglines
      .map(l => l.text)
      .join('\n')
    console.log(out)
    console.log('---')
  })
  .on('end', function () {
    console.log('- LOG END')
  })
}

go()
