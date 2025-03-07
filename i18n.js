const path = require('path')
const i18next = require('i18next')
const middleware = require('i18next-http-middleware')
const Backend = require('i18next-fs-backend')

// 设置国际化
i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: 'zh', // 默认语言
    preload: ['en', 'zh'], // 预加载语言
    backend: {
      loadPath: path.join(__dirname, 'locales', '{{lng}}.json')
    },
    debug: true
  })

module.exports = { i18next, i18nMiddleware: middleware.handle(i18next) }
