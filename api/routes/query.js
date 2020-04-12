const express = require('express')
const query = require('../controllers/query').query

const router = express.Router()

router.get('/', query)

module.exports = router
