const { join } = require('path')
const OakPlatform = require(join(__dirname, '..'))
const _ = require('lodash')

async function go () {
  let platform = await new OakPlatform({
    host: process.env.HOST
  })

  let webcam = await platform.webcam()

  webcam.info(undefined, function (err, { webcams }) {
    if (err) throw err

    let { webcam_id } = webcams[0]

    let mode = _.reverse(
      _.filter(webcams[0].available_modes, m => m.indexOf('1920x1080') > -1)
    )[0]

    let streamRequest = {
      webcam_id,
      mode,
      port: '9666'
    }

    let stopStream = function (cb = function () {}) {
      console.log('stopped stream')
      webcam.stopStream(streamRequest, cb)
    }

    let startStream = function () {
      webcam.startStream(streamRequest, function (err, stream) {
        if (err && err.message.indexOf('ALREADY_EXISTS') > -1) {
          stopStream(startStream)
        } else if (err) {
          throw err
        } else {
          console.log('URL:', stream.url)
        }
      })
    }
    startStream()
  })
}

go()
