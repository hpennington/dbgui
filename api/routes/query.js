const express = require('express')
const query = require('../controllers/query').query

const router = express.Router()

router.post('/', query)

module.exports = router
