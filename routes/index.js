const userRoutes = require('./user.route')
const taskRoutes = require('./task.route')

module.exports = (app) => {
  app.use('/api/users', userRoutes)
  app.use('/api/tasks', taskRoutes)
}
