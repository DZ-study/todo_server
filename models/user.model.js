module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true // 用户名唯一
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true // 邮箱唯一
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING,
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
  }, {
    tableName: 'users',
    timestamps: false, // 自动创建createdAt和updatedAt字段
  })
}