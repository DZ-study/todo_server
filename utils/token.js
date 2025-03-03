const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

// 生成Token
const generateToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' })
}

// 解析Token,获取userId
const getIdByToken = (authorization) => {
  if (!authorization) {
    return null
  }
  const token = authorization.split(' ')[1]
  return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(err)
      return null
    }
    return decoded.id
  })
}

module.exports = {
  generateToken,
  getIdByToken
}
