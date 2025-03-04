const userRoutes = require('./user.route')
const taskRoutes = require('./task.route')
const tagRoutes = require('./tag.route')

module.exports = app => {
  app.use('/api/users', userRoutes)
  app.use('/api/tasks', taskRoutes)
  app.use('/api/tags', tagRoutes)
}
