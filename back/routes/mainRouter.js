const express = require("express")
const router = express.Router()
const controller = require('../controllers/mainController')
const validator = require('../middle/validator')
const userSchema = require("../schemas/userSchema")

router.post('/register', validator.validateRegister, controller.register)
router.post('/login', validator.validateLogin, controller.login)
router.post('/check', controller.check)
router.post('/addpost',validator.validatePost, controller.addPost)
router.post('/addreservation', controller.addReservation)



module.exports = router