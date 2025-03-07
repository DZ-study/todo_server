module.exports = {
  input: ['src/**/*.{js,jsx,ts,tsx}'], // 需要扫描的文件
  output: 'locales/$LOCALE.json', // 生成的 JSON 文件
  locales: ['zh', 'en'], // 需要支持的语言
  keySeparator: '.', // key 的分隔符（如果为空，则 key 以 `/` 连接）
  useKeysAsDefaultValue: false, // ❌ 不使用原文作为 key
  createOldCatalogs: false, // 不生成 _old 备份文件
  defaultValue: (lng, ns, key) => '', // 避免 key 变成中文
  transform: function (text, file, line) {
    // 自动生成 key（将中文转换为拼音或简短英文）
    const crypto = require('crypto')
    const slugify = require('slugify')

    if (/[\u4e00-\u9fa5]/.test(text)) {
      // 仅处理中文
      return slugify(text, { lower: true, strict: true }) // 生成英文 key
    }
    return text
  }
}
