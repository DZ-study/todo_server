/**
 * 任务的标签管理
 */

module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'Tag',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      color: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      tableName: 'tags',
      timestamps: false
    }
  )
