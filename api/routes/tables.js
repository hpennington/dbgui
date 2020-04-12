const express = require('express')
const tables = require('../controllers/tables').tables

const router = express.Router()
router.get('/', tables)

module.exports = router

