const express = require('express')
const databases = require('../controllers/databases').databases

const router = express.Router()

router.post('/', databases)

module.exports = router
