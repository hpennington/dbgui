const express = require('express')
const table = require('../controllers/table').table

const router = express.Router()
router.post('/', table)

module.exports = router

