// 任务管理
const express = require('express')
const router = express.Router()

const taskController = require('../controllers/task.controller')

// 创建任务
router.post('/add', taskController.createTask)
// 查询任务列表
// TODO: 列表查询时控制字段（不用返回所有字段）
router.get('/list', taskController.getTaskList)

module.exports = router
