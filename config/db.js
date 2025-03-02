const dotenv = require('dotenv')
const { Sequelize } = require('sequelize')

dotenv.config() // load .env file

const connConf = {
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'nextup_db',
  connectionLimit: 5,
}

// sequelize ORM关系映射框架
const sequelize = new Sequelize(connConf.database, 
      connConf.user, connConf.password, {
        host: connConf.host,
        dialect: 'mysql',
        logging: console.log,
      })


// 验证是否连接成功
sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err))

module.exports = sequelize

