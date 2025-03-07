const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid')
const { generateToken, getIdByToken } = require('@/utils/token')
const { getOpenId } = require('@/utils/wechat')
const AppError = require('@/utils/AppError')

const { User, Setting } = require('@/models/index')

module.exports = {
  register: async (req, res, next) => {
    try {
      const { username, password } = req.body

      if (!username || !password) {
        throw new AppError(req.t('userOrPassEmpty'), 400)
      }

      const user = await User.findOne({ where: { username } })
      if (user) {
        throw new AppError(req.t('userExist'), 400)
      }
      const userId = uuidv4()
      const hashedpassword = await bcrypt.hash(password, 10)
      await User.create({ id: userId, username, password: hashedpassword })
      // 注册成功后生成默认的系统设置
      await Setting.create({ userId })
      return res.status(201).json({ status: 201, message: req.t('registSuccess') })
    } catch (error) {
      next(error)
    }
  },
  login: async (req, res, next) => {
    const { username, password } = req.body

    if (!username || !password) {
      throw new AppError(req.t('userOrPassEmpty'), 400)
    }
    try {
      const { dataValues: user } = await User.findOne({ where: { username } })
      if (!user) {
        throw new AppError(req.t('userNotExist'), 400)
      }
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        throw new AppError(req.t('passwordError'), 400)
      }
      const token = generateToken(user)
      res.json({ status: 200, message: req.t('loginSuccess'), token })
    } catch (error) {
      next(error)
    }
  },
  getUserInfo: async (req, res, next) => {
    const userId = getIdByToken(req.header('Authorization'))
    try {
      const [rows] = await User.findOne({ where: { id: userId } })
      if (rows.length === 0) throw new AppError(req.t('userNotExist'), 404)
      res.status(200).json({ status: 200, message: req.t('searchSuccess'), data: rows[0] })
    } catch (error) {
      next(error)
    }
  },
  // TODO: 微信授权登录
  loginByWechat: async (req, res) => {
    const { code, nickname, avatarUrl } = req.body
    if (!code) {
      return res.status(400).json({ status: 400, message: 'code不能为空' })
    }

    try {
      const { openid } = await getOpenId(code)
      if (!openid) {
        return res.status(400).json({ status: 400, message: '获取openid失败' })
      }
      let user
      const [rows] = await userModel.getUserByParam('openid', openid)

      if (rows.length === 0) {
        ;[user] = await userModel.insertUser({
          openid,
          nickname,
          avatarUrl
        })
      } else {
        user = rows[0]
      }
      const token = generateToken(user)
      res.status(200).json({ status: 200, message: '微信登录成功', token })
    } catch (error) {
      res.status(500).json({ status: 500, message: '登录失败', error })
    }
  }
}
