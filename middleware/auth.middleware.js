/**
 * token认证中间件
 */
const jwt = require('jsonwebtoken')

// 接口白名单，不需要token认证
const whitelist = ['/api/users/register', '/api/users/login']

const authMiddleware = (req, res, next) => {
  if (whitelist.includes(req.path)) {
    return next()
  }

  const token = req.header('Authorization')?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ status: 401, message: req.t('noToken') })
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch (error) {
    res.status(403).json({ status: 403, message: req.t('tokenInvalid') })
  }
}

module.exports = authMiddleware
