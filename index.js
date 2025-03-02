const express = require('express')
const app = express()
const sequelize = require('./models/index')

const PORT = 3000

const router = require('./routes')
const authMiddleware = require('./middleware/auth.middleware')


app.use(express.json())
app.use(authMiddleware)

router(app)

app.listen(PORT, () => {
  try {
    // sequelize.authenticate()
    console.log('数据库连接成功，请访问http://localhost:3000');
  } catch (error) {
    console.log('数据库连接失败', error);
    
  }
})