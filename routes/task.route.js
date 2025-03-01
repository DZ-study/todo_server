// 任务管理
const express = require('express')
const router = express.Router()

const taskController = require('../controllers/task.controller')

// 获取任务列表
// router.get('/list', taskController.getTaskList)

// 创建任务
router.post('/add', taskController.createTask)

module.exports = router