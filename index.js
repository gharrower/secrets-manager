const { SecretManagerServiceClient } = require('@google-cloud/secret-manager')
const client = new SecretManagerServiceClient()
const project = require('./project')

class Secrets {
  constructor() {
    this.secrets = null
  }

  static async getSecret(name, version = 'latest') {
    try {
      let secretName = `projects/${project.id}/secrets/${name}/versions/${version}`
      let [secret] = await client.accessSecretVersion({ name: secretName })
      return secret.payload.data.toString('utf8')
    } catch (e) {
      return null
    }
  }

  static async init(keys) {
    await project.init()

    let secrets = {}
    for (let key of Object.keys(keys)) {
      let version = keys[key]
      secrets[key] = await this.getSecret(key, version)
    }
    this.secrets = secrets
    return this.secrets
  }
}

module.exports = Secrets
