const { join } = require('path')
const { readdir } = require('fs')
const { promisify } = require('util')

const grpc = require('grpc')
const _ = require('lodash')
const readdirAsync = promisify(readdir)

const PROTOS_BASE = join(__dirname, 'platform-protos')

class OakPlatform {
  constructor ({ host = 'localhost:443', root, priv, chain }) {
    // create insecure credentials if we have no credential files
    const credentials = (root && priv && chain) ? grpc.credentials.createSsl(root, priv, chain) : grpc.credentials.createInsecure()

    // wrapping up async instance, you cannot have a class constructor instatiated as an async function
    return (async () => {
      let protoFiles = await getProtoFiles()
      // reduce those proto files to keyed object
      let res = await Promise.all(protoFiles.map(async (protoPath) => {
        let result = {}
        // get the constructed proto
        let protoObj = await getProtoObject(protoPath)
        // use the proto file name as the key
        let protoName = _.camelCase(
          protoPath.replace('.proto', '')
        )
        // let it sit undefined if there is an error
        if (_.isError(protoObj)) {
          result[protoName] = undefined
          return result
        }

        result[protoName] = async function () {
          let final = await connect(host, credentials, protoObj)
          return final
        }

        return result
      }))
      // merge all into one object
      return _.assign({}, ...res)
    })()
  }
}

async function connect (host, creds, protoObj) {
  // extract the actual service in the object
  let Service = _.find(protoObj, 'service')
  try {
    // connect with our previous credentials to this service.
    // NOTE: this assumes there is one service definition per proto object
    const service = await new Service(host, creds)

    // extract just the static proto constructors
    const protos = _.omitBy(protoObj, v => _.has(v, 'service'))
    _.assign(service, protos)
    return service
  } catch (err) {
    return err
  }
}

async function getProtoFiles () {
  try {
    let protoFiles = await readdirAsync(PROTOS_BASE)
    return _.filter(protoFiles, file => file.indexOf('.proto') !== -1)
  } catch (e) {
    throw new Error('The protobuf resource directory does not exist')
  }
}

async function getProtoObject (PROTO_PATH) {
  if (!PROTO_PATH) throw new Error('No proto definition specified')
  try {
    // load the proto file, and extract the object definitions on oak.platform
    return _.get(
      await grpc.load({
        root: PROTOS_BASE,
        file: PROTO_PATH
      }),
      'oak.platform'
    )
  } catch (err) {
    return new Error(err)
  }
}

module.exports = OakPlatform
