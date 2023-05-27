const googlePassportConfig = require('./googlePassport')
const githubPassportConfig = require('./githubPassport')

module.exports = () => {
  googlePassportConfig()
  githubPassportConfig()
}
