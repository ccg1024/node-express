const express = require('express')
const homeHandler = require('../router_handler/default')

const router = express.Router()

router.get('/', homeHandler.homePage)

module.exports = router
