const { Setting } = require('@/models/index')
const AppError = require('@/utils/AppError')
const { getIdByToken } = require('@/utils/token')

module.exports = {
  getSettings: async (req, res, next) => {
    // 获取用户系统配置
    try {
      const userId = getIdByToken(req.header('Authorization'))
      const settings = await Setting.findAll({ where: { userId } })
      return res.status(200).json({ status: 200, message: req.t('searchSuccess'), data: settings })
    } catch (error) {
      next(error)
    }
  },
  updateSettings: async (req, res, next) => {
    // 更新用户系统配置
    try {
      const userId = getIdByToken(req.header('Authorization'))
      const setting = await Setting.findOne({ where: { userId } })
      if (!setting) {
        throw new AppError(req.t('notFound'), 404)
      }
      Object.assign(setting, req.body)
      await setting.save()
      return res.status(200).json({ status: 200, message: req.t('updateSuccess'), data: setting })
    } catch (error) {
      next(error)
    }
  }
}
