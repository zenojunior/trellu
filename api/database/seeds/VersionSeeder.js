'use strict'

const Factory = use('Factory')
const Version = use('App/Models/Version')


class VersionSeeder {
  async run() {
    await Version.create({ version: 'v0.0.1' })
    await Version.create({ version: 'v0.0.2' })
  }
}

module.exports = VersionSeeder
