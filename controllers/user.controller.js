const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid')
const { generateToken } = require('../utils/token')
const { getOpenId } = require('../utils/wechat')

const { User } = require('../models/index')

module.exports = {
  register: async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
      return res
        .status(400)
        .json({ status: 400, message: '用户名或密码不能为空' })
    }

    const user = await User.findOne({ where: { username } })
    if (user) {
      return res.status(400).json({ status: 400, message: '用户名已存在' })
    }

    try {
      const userId = uuidv4()
      const hashedpassword = await bcrypt.hash(password, 10)
      await User.create({ id: userId, username, password: hashedpassword })
      res.status(201).json({ status: 201, message: '注册成功' })
    } catch (error) {
      res.status(500).json({ status: 500, message: '注册失败', error })
    }
  },
  login: async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
      return res
        .status(400)
        .json({ status: 400, message: '用户名或密码不能为空' })
    }
    try {
      const { dataValues: user } = await User.findOne({ where: { username } })
      console.log('findOne: ', user)

      if (!user) {
        return res.status(400).json({ status: 400, message: '用户不存在' })
      }
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(400).json({ status: 400, message: '密码错误' })
      }
      const token = generateToken(user)

      res.json({ status: 200, message: '登录成功', token })
    } catch (error) {
      res.status(500).json({ status: 500, message: '登录失败', error })
    }
  },
  getUserInfo: async (req, res) => {
    try {
      const [rows] = await User.findOne({ where: { id: req.query.userId } })
      if (rows.length === 0)
        return res.status(404).json({ status: 404, message: '用户不存在' })
      res.json(rows[0])
    } catch (error) {
      res.status(500).json({ status: 500, message: '获取用户信息失败', error })
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
