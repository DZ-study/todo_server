// 标签管理的路由
const express = require('express')
const router = express.Router()
const tagController = require('@/controllers/tag.controller')

// 获取所有标签
router.get('/', tagController.getTagList)
// 获取指定id的标签
// router.get('/:id', tagController.getTagById)
// 创建标签
router.post('/', tagController.createTag)
// 更新标签
router.put('/:id', tagController.updateTag)
// 删除标签
router.delete('/:id', tagController.deleteTag)

module.exports = router
