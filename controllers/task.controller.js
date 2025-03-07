const { Op } = require('sequelize')
const { Task, Tag } = require('@/models/index')
const sequelize = require('@/config/db')
const { getIdByToken } = require('@/utils/token')
const AppError = require('@/utils/AppError')

module.exports = {
  // 创建任务
  createTask: async (req, res, next) => {
    const { task, userId } = req.body
    const taskObj = {
      userId,
      title: task.title,
      description: task.description,
      status: task.status || 1,
      priority: task.priority || 1,
      startTime: Math.floor(task.startTime / 1000).toString()
    }
    const { tags } = task
    if (task.endTime) {
      taskObj.endTime = task.endTime
    }
    if (!tags || !tags.length) {
      // 创建无标签的任务
      try {
        await Task.create(taskObj)
        return res.status(201).json({ status: 201, message: req.t('created') })
      } catch (err) {
        next(err)
      }
    } else {
      sequelize
        .transaction(async t => {
          // 自动管理事务，不需要手动提交/回滚
          const task = await Task.create(taskObj, { transaction: t })
          // bulkCreate 批量插入标签
          await Tag.bulkCreate(
            tags.map(o => ({ name: o, userId })),
            { ignoreDuplicates: true, transaction: t }
          )
          const tagIds = await Tag.findAll({
            where: { name: { [Op.in]: tags } },
            transaction: t
          })

          // 自动生成的关联表内置的方法
          await task.addTags(tagIds, { transaction: t })
        })
        .then(() => {
          return res.status(201).json({ status: 201, message: req.t('created') })
        })
        .catch(err => {
          next(err)
        })
    }
  },
  // 更新任务 TODO:未测试
  // update()直接更新数据库的字段
  // findOne + save先查找实例，再更新字段
  updateTask: async (req, res) => {
    const { id, fields } = req.body
    try {
      const task = await Task.findOne({ where: { id } })
      if (!task) {
        throw new AppError(req.t('taskNotExist'), 404)
      }
      Object.assign(task, fields)
      await task.save()
      return res.status(200).json({ status: 200, message: req.t('updated'), task })
    } catch (err) {
      next(err)
    }
  },
  // 查询用户的任务列表
  getTaskList: async (req, res, next) => {
    try {
      const userId = getIdByToken(req.header('Authorization'))
      if (!userId) {
        throw new AppError(req.t('tokenInvalid'), 401)
      }

      const { tag, startTime, priority, status, orderBy = 'createAt', order = 'DESC' } = req.query
      const whereCond = { userId }
      if (priority) {
        whereCond.priority = priority
      }
      if (status) {
        whereCond.status = status
      }
      if (startTime) {
        whereCond.startTime = { [Op.gte]: startTime }
      }

      const tasks = await Task.findAndCountAll({
        attributes: ['id', 'title', 'priority', 'status', 'startTime'],
        where: whereCond,
        include: tag
          ? {
              model: Tag,
              as: 'tags',
              where: { name: tag },
              require: true
            }
          : { model: Tag, as: 'tags' },
        order: [[orderBy, order]]
      })
      return res.status(200).json({ status: 200, message: req.t('searchSuccess'), tasks })
    } catch (err) {
      next(err)
    }
  },
  // 删除任务
  deleteTask: async (req, res, next) => {
    try {
      const { ids } = req.body
      await Task.destroy({ where: { id: ids } })
      return res.status(200).json({ status: 200, message: req.t('deleted') })
    } catch (err) {
      next(err)
    }
  }
}
