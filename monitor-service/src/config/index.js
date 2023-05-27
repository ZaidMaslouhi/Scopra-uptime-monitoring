const Env = require('./envirement')
const axios = require('./axios')

module.exports = {
  ...Env,
  // Axios
  Axios: axios
}
