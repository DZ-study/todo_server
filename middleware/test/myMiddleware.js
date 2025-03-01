const myMiddleware = (req, res, next) => {
  console.log('我是一个中间件')
  next()
}

module.exports = myMiddleware