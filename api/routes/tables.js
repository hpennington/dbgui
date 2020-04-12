const express = require('express')
const tables = require('../controllers/tables').tables

const router = express.Router()
router.post('/', tables)

module.exports = router

