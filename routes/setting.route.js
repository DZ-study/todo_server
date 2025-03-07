// 系统设置的路由
const express = require('express')
const router = express.Router()
const settingController = require('@/controllers/setting.controller')

router.get('/', settingController.getSettings)

module.exports = router
