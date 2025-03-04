const { Tag } = require('@/models/index')
const AppError = require('@/utils/AppError')
const { getIdByToken } = require('@/utils/token')

module.exports = {
  // 创建标签
  createTag: async (req, res, next) => {
    try {
      const userId = getIdByToken(req.header('Authorization'))
      const { name, color = '#ff0000' } = req.body
      if (!name) {
        throw new AppError('标签名称不能为空', 400)
      }
      const tag = await Tag.findOne({ where: { name, userId } })
      if (tag) {
        throw new AppError('标签已存在', 400)
      }
      await Tag.create({ name, color, userId })
      return res.status(200).json({ status: 200, message: '创建标签成功' })
    } catch (err) {
      next(err)
    }
  },
  // 更新标签
  updateTag: async (req, res, next) => {
    try {
      const userId = getIdByToken(req.header('Authorization'))
      const { id } = req.params
      const { name, color } = req.body
      if (!name) {
        throw new AppError('标签名称不能为空', 400)
      }
      const tag = await Tag.findOne({ where: { id, userId } })
      if (!tag) {
        throw new AppError('标签不存在', 400)
      }
      tag.name = name
      if (color) {
        tag.color = color
      }
      await tag.save()
      return res.status(200).json({ status: 200, message: '更新标签成功' })
    } catch (err) {
      next(err)
    }
  },
  // 删除标签
  deleteTag: async (req, res, next) => {
    try {
      const userId = getIdByToken(req.header('Authorization'))
      const { id } = req.params
      const tag = await Tag.findOne({ where: { id, userId } })
      if (!tag) {
        throw new AppError('标签不存在', 400)
      }
      await tag.destroy()
      return res.status(200).json({ status: 200, message: '删除标签成功' })
    } catch (err) {
      next(err)
    }
  },
  // 获取标签列表
  getTagList: async (req, res, next) => {
    try {
      const userId = getIdByToken(req.header('Authorization'))
      const tags = await Tag.findAndCountAll({ where: { userId } })
      return res.status(200).json({ status: 200, message: '获取标签列表成功', tags })
    } catch (err) {
      next(err)
    }
  }
  // 获取标签详情
}
