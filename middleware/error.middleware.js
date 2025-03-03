const AppError = require('../utils/AppError')

const handleSequelizeError = (err) => {
  // 处理 Sequelize 特有错误
  if (err.name === 'SequelizeValidationError') {
    const messages = err.errors.map((e) => e.message)
    return new AppError(messages.join('; '), 400)
  }
  if (err.name === 'SequelizeUniqueConstraintError') {
    return new AppError('Duplicate field value', 400)
  }
  return err
}

module.exports = (err, req, res, next) => {
  // 处理其他错误
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'

  let error = { ...err }
  error.message = err.message

  // 处理 Sequelize 错误
  error = handleSequelizeError(error)

  // 生产环境 vs 开发环境响应
  if (process.env.NODE_ENV === 'production') {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message
    })
  } else {
    console.log(error.stack || error)
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
      error: error,
      stack: error.stack
    })
  }
}
