const { api } = require('../../lib/axios')

const login = (data) => {
  return api({
    url: '/login/login',
    method: 'POST',
    data
  })
}

module.exports = { login }
