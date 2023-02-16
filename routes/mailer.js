const { mail } = require('../controllers/conn.js')

const router = require('express').Router()

//  send gmail


router.post('/gen',mail)


module.exports = router