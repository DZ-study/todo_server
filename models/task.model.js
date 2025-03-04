/**
 * 任务管理
 */
module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'Task',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      },
      status: {
        // 1-未开始 2-进行中 3-已完成 4-已放弃 5-已过期 6-已删除
        type: DataTypes.INTEGER,
        allowNull: false
      },
      priority: {
        // 1-无 2-低 3-中 4-高
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      startTime: {
        type: DataTypes.STRING,
        allowNull: true
      },
      endTime: {
        type: DataTypes.TIME,
        allowNull: true
      },
      createAt: {
        type: DataTypes.STRING, // 使用时间戳（秒）
        allowNull: false,
        defaultValue: () => Date.now().toString()
      },
      updateAt: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: () => Date.now().toString()
      }
    },
    {
      tableName: 'tasks',
      timestamps: false
    }
  )
