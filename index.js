const { join } = require('path')
const { readdir } = require('fs')
const { promisify } = require('util')

const grpc = require('grpc')
const _ = require('lodash')
const readdirAsync = promisify(readdir)

const PROTOS_PATH = join(__dirname, 'platform-protos')

class OakPlatform {
  constructor (root, priv, chain, host = '') {}
  async listProtoFiles () {
    try {
      return _.filter(
        await readdirAsync(PROTOS_PATH),
        (file) => file.indexOf('.proto') !== -1
      )
    } catch (e) {
      throw new Error('platform-protos folder does not exist')
    }
  }

  async protos () {
    return  _.reduce(
      await this.listProtoFiles(),
      (all, file) => {
        try {
          return _.merge(
            all,
            grpc.load(join(PROTOS_PATH, file))
          )
        } catch (e) {
          return all
        }
    }, {})
  }
}

module.exports = OakPlatform
