/**
 * token认证中间件
 */
const jwt = require('jsonwebtoken')

const whitelist = ['/api/users/register', '/api/users/login']

const authMiddleware = (req, res, next) => {

  console.log(req.path)

  if (whitelist.includes(req.path)) {
    return next()
  }

  const token = req.header('Authorization')
  
  if (!token) {
    return res.status(401).json({ status: 401, message: '未授权' })
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch (error) {
    res.status(403).json({ status: 403, message: 'Token无效' })
  }
}

module.exports = authMiddleware