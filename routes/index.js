const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()

router.get('/', Controller.landingPage)

router.get('/register', Controller.register)
router.post('/register', Controller.registerPost)

router.get('/login', Controller.login)
router.post('/login', Controller.loginPost)

// router.get('/logout', Controller.logout)



module.exports = router