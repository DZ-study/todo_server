const express = require('express')
const router = express.Router()
const userController = require('@/controllers/user.controller')

// 用户注册
router.post('/register', userController.register)
// 用户登录
router.post('/login', userController.login)
router.get('/user', userController.getUserInfo)

module.exports = router
