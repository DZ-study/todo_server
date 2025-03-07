const userRoutes = require('./user.route')
const taskRoutes = require('./task.route')
const tagRoutes = require('./tag.route')
const settingRoutes = require('./setting.route')

module.exports = app => {
  app.use('/api/users', userRoutes)
  app.use('/api/tasks', taskRoutes)
  app.use('/api/tags', tagRoutes)
  app.use('/api/settings', settingRoutes)
}
