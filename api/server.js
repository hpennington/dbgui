const express = require('express')
const databases = require('./routes/databases')
const tables = require('./routes/tables')
const query = require('./routes/query')

const app = express()
app.use('/databases', databases)
app.use('/tables', tables)
app.use('/query', query)

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log('API listening on port ' + PORT))
