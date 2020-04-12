const express = require('express')
const databases = require('../controllers/databases').databases

const router = express.Router()

router.get('/', databases)

module.exports = router
