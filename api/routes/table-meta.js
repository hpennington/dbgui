const express = require('express')
const tableMeta = require('../controllers/table-meta').tableMeta

const router = express.Router()
router.post('/', tableMeta)

module.exports = router

