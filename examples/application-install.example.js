const { join } = require('path')
const OakPlatform = require(join(__dirname, '..'))

async function go () {
  let platform = await new OakPlatform({
      host: process.env.HOST
  })

  let app = await platform.application()

  app.install({
      "services": 
      [
        {
            "image": "index.docker.io/oaklabs/simple-url:latest",
            "username": process.env.DUSER,
            "password": process.env.DPASS
        }
      ]
  }, function (err) {
      console.log('- ERROR', err)
  })
  .on('data', function (data) {
    console.log(JSON.stringify(data, null, 2))
    console.log('---')
  })
  .on('end', function () {
    console.log('- DONE INSTALLING')

    app.swapIdleAndLive(undefined, function () {
      console.log('- SWAPPED IDLE AND LIVE')

      app.viewLive(undefined, function (live) {
        console.log('- LIVE:', live)
      })
    })
  })
}

go()
