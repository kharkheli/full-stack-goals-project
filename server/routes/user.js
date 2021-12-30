const express = require('express')
const router = express.Router()
const authorization = require('../middlewares/authorization')

const { signUp, logIn, getAcount } = require('../controlers/user')

router.route('/log-in').post(logIn)

router.route('/sign-up').post(signUp)
// router.route('/info').get(authorization, getAcount)

module.exports = router
