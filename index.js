const express = require('express')
const sequelize = require('./config/db')
const authMiddleware = require('./middleware/auth.middleware')
const errorHandler = require('./middleware/error.middleware')
// 路由别名
require('module-alias/register')
// 引入国际化
const { i18nMiddleware } = require('./i18n')

const PORT = 3000
const app = express()

app.use(i18nMiddleware)

const router = require('./routes')

app.use(express.json())
app.use(authMiddleware)

router(app)
// 统一错误处理中间件必须放在所有路由之后，否则无法捕获到错误
app.use(errorHandler)

app.listen(PORT, () => {
  try {
    sequelize.authenticate()
    console.log('数据库连接成功，请访问http://localhost:3000')
  } catch (error) {
    console.log('数据库连接失败', error)
  }
})
