const express = require('express')
const cors = require('cors')
const databases = require('./routes/databases')
const tables = require('./routes/tables')
const table = require('./routes/table')
const query = require('./routes/query')
const tableMeta = require('./routes/table-meta')

const app = express()

app.use(express.json())
app.use(cors())

app.use(function (req, res, next) {
  if (req.body.api_key === process.env.API_KEY) {
    next()
  } else {
    res.sendStatus(401)
  }
})

app.use('/databases', databases)
app.use('/tables', tables)
app.use('/query', query)
app.use('/table', table)
app.use('/table-meta', tableMeta)

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log('API listening on port ' + PORT))
