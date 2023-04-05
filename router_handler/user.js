/*
* extract handle function from ../router
*/
const jwt = require('jsonwebtoken')
const config = require('../config')

exports.regUser = (_req, res) => {
  console.log('got front from registe ', _req.body)
  const tokenStr = jwt.sign({ userName: 'william' }, config.jwtSecretKey, { expiresIn: config.tokenTime, algorithm: config.algorithms })
  res.send({
    status: 0,
    message: 'registe success',
    token: 'Bearer ' + tokenStr
  })
}

exports.login = (_req, res) => {
  console.log('got front data', _req.body)
  // generate token
  const tokenStr = jwt.sign({ userName: 'william' }, config.jwtSecretKey, { expiresIn: config.tokenTime, algorithm: config.algorithms })
  res.send({
    status: 0,
    message: 'login success',
    token: 'Bearer ' + tokenStr
  })
}
