// 用户系统设置
module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'Setting',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      funcModules: {
        // 功能模块
        type: DataTypes.JSON,
        defaultValue: [{ showCalendar: true, showQuadrant: true, showCard: true, showFocus: true }]
      },
      smartCheckList: {
        // 智能清单
        type: DataTypes.JSON,
        defaultValue: [
          { key: 'all', value: 1, order: null, group: 1 },
          { key: 'today', value: 1, order: null, group: 1 },
          { key: 'tomorrow', value: 1, order: null, group: 1 },
          { key: 'lastWeek', value: 1, order: null, group: 1 },
          { key: 'inbox', value: 1, order: null, group: 1 },
          { key: 'tag', value: 1, order: null, group: 2 },
          { key: 'filter', value: 1, order: null, group: 2 },
          { key: 'completed', value: 1, order: null, group: 3 },
          { key: 'abandoned', value: 1, order: null, group: 3 },
          { key: 'trash', value: 1, order: null, group: 3 }
        ]
      },
      themeConf: {
        // 主题配置
        type: DataTypes.JSON,
        defaultValue: { color: '#ffffff' }
      },
      language: {
        // 语言
        type: DataTypes.STRING,
        defaultValue: 'zh'
      }
    },
    {
      modelName: 'settings',
      timestamps: false
    }
  )
