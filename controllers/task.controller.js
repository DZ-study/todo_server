const { Task } = require('../models/index')

module.exports = {
  createTask: async (req, res) => {
    const { task, userId } = req.body
    const taskObj = {
      userId,
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      startTime: task.startTime
    }
    if (task.endTime) { taskObj.endTime = task.endTime }
    if (!task.tags || !task.tags.length) { // 创建无标签的任务
      try {
        await Task.create(taskObj)
        res.status(201).json({ status: 201, message: '创建任务成功' })
      } catch (err) {
        res.status(500).json({ status: 500, message: '创建任务失败', error: err })
      }
    } else {
      try {
        await taskModel.createTaskWithTags(taskObj, task.tags)
        res.status(201).json({ status: 201, message: '创建任务成功' })
      } catch (err) {
        res.status(500).json({ status: 500, message: '创建任务失败', error: err })
      }    
    }
  }
}