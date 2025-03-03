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
        type: DataTypes.INTEGER,
        allowNull: false
      },
      priority: {
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
