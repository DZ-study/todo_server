const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')

// 导入所有模型
const User = require('./user.model')(sequelize, DataTypes)
const Task = require('./task.model')(sequelize, DataTypes)
const Tag = require('./tag.model')(sequelize, DataTypes)

// 建立模型之间的关系
User.hasMany(Task, { foreignKey: 'userId', onDelete: 'CASCADE' })
User.hasMany(Tag, { foreignKey: 'userId', onDelete: 'CASCADE' })
Task.belongsTo(User, { foreignKey: 'userId' })
Tag.belongsTo(User, { foreignKey: 'userId' })
Task.belongsToMany(Tag, { through: 'TaskTag' })
Tag.belongsToMany(Task, { through: 'TaskTag' })

// 统一同步所有表
sequelize.sync({ alter: true }).then(() => {
  console.log('所有表已同步');
}).catch(err => {
  console.error('数据库同步失败:', err);
})

module.exports = {
  User,
  Task,
  Tag
}