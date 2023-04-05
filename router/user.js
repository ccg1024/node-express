const express = require('express')

const userHandler = require('../router_handler/user')

const router = express.Router()

router.post('/registe', userHandler.regUser)

router.post('/login', userHandler.login)

module.exports = router
