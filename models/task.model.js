/**
 * 任务管理
 */
module.exports = (sequelize, DataTypes) => sequelize.define('Task', {
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
}, {
  tableName: 'tasks',
  timestamps: false
})


// module.exports = {
//   // 创建无标签的任务
//   createTask: async (task) => {
//     try {
//       const sql = `INSERT INTO tasks (${Object.keys(task).join(', ')}) VALUES (${Object.values(task).map(() => '?').join(', ')})`
//       const [result] = await pool.execute(sql, Object.values(task))
//       return result
//     } catch (error) {
//       throw error
//     }
//   },
//   createTaskWithTags: async function(task, tags) {
//     const connection = await pool.getConnection()
//     try {
//       await connection.beginTransaction() // 开始事务
      
//       // 插入任务
//       const sql = `INSERT INTO tasks (${Object.keys(task).join(', ')}) VALUES (${Object.values(task).map(() => '?').join(', ')})`
//       const [taskResult] = await connection.execute(sql, Object.values(task))
      
//       const taskId = taskResult.insertId

//       // 插入标签
//       const tagSql = `INSERT IGNORE INTO tags (name) VALUES ${tags.map(() => '(?)').join(', ')}`
//       await connection.execute(tagSql, tags)

//       // 获取标签id
//       const [tagRows] = await connection.query(`SELECT id FROM tags WHERE name IN (${tags.map(tag => `"${tag}"`).join(', ')})`)
      
//       // 关联任务标签关联
//       await connection.query('INSERT INTO task_tags (task_id, tag_id) VALUES ?', [tagRows.map(tag => [taskId, tag.id])])

//       await connection.commit() // 提交事务
//     } catch (error) {
//       await connection.rollback() // 回滚事务
//       throw error
//     } finally {
//       await connection.release() // 关闭连接
//     }
//   }

// }