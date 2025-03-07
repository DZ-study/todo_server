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
        throw new AppError(req.t('tagEmpty'), 400)
      }
      const tag = await Tag.findOne({ where: { name, userId } })
      if (tag) {
        throw new AppError(req.t('tagExist'), 400)
      }
      await Tag.create({ name, color, userId })
      return res.status(200).json({ status: 200, message: req.t('created') })
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
        throw new AppError(req.t('tagEmpty'), 400)
      }
      const tag = await Tag.findOne({ where: { id, userId } })
      if (!tag) {
        throw new AppError(req.t('tagNotExist'), 400)
      }
      tag.name = name
      if (color) {
        tag.color = color
      }
      await tag.save()
      return res.status(200).json({ status: 200, message: req.t('updated') })
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
        throw new AppError(req.t('tagNotExist'), 400)
      }
      await tag.destroy()
      return res.status(200).json({ status: 200, message: req.t('deleted') })
    } catch (err) {
      next(err)
    }
  },
  // 获取标签列表
  getTagList: async (req, res, next) => {
    try {
      const userId = getIdByToken(req.header('Authorization'))
      const tags = await Tag.findAndCountAll({ where: { userId } })
      return res.status(200).json({ status: 200, message: req.t('searchSuccess'), tags })
    } catch (err) {
      next(err)
    }
  }
  // TODO: 获取标签详情（标签详情只有两个字段，列表已全部返回，后期需要这个方法再补充
}
