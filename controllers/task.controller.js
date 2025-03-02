const { Op } = require('sequelize')
const { Task, Tag } = require('../models/index')
const sequelize = require('../config/db')

module.exports = {
  createTask: async (req, res) => { // 创建任务
    const { task, userId } = req.body
    const taskObj = {
      userId,
      title: task.title,
      description: task.description,
      status: task.status || 1,
      priority: task.priority || 1,
      startTime: task.startTime
    }
    const { tags } = task
    if (task.endTime) { taskObj.endTime = task.endTime }
    if (!tags || !tags.length) { // 创建无标签的任务
      try {
        await Task.create(taskObj)
        res.status(201).json({ status: 201, message: '创建任务成功' })
      } catch (err) {
        res.status(500).json({ status: 500, message: '创建任务失败', error: err })
      }
    } else {
      sequelize.transaction(async (t) => { // 自动管理事务，不需要手动提交/回滚
          const task = await Task.create(taskObj, { transaction: t })
          // bulkCreate 批量插入标签
          await Tag.bulkCreate(tags.map(o => ({ name: o, userId })), { ignoreDuplicates: true, transaction: t })
          const tagIds = await Tag.findAll({ where: { name: { [Op.in]: tags }}, transaction: t })
          
          // 自动生成的关联表内置的方法
          await task.addTags(tagIds, { transaction: t })

      }).then(() => {
        res.status(201).json({ status: 201, message: '创建任务成功' })
      }).catch(err => {
        console.error('事务错误:', err);
        res.status(500).json({ status: 500, message: '创建任务失败', error: JSON.stringify(err) })
      })
    }
  }
}