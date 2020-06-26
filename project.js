const { GoogleAuth } = require('google-auth-library')

class Project {
  constructor() {
    this.id = null
  }

  static async init(id = null) {
    if (id) {
      this.id = id
      return this.id
    }

    try {
      const auth = new GoogleAuth({
        scopes: 'https://www.googleapis.com/auth/cloud-platform',
      })
      this.id = await auth.getProjectId()
      return this.id
    } catch (err) {
      return null
    }
  }
}

module.exports = Project
