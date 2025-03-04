// 任务管理
const express = require('express')
const router = express.Router()

const taskController = require('@/controllers/task.controller')

// 创建任务
router.post('/add', taskController.createTask)
// 查询任务列表
router.get('/list', taskController.getTaskList)
// 删除任务
router.delete('/delete', taskController.deleteTask)
// 更新任务
router.put('/update/:id', taskController.updateTask)
module.exports = router
