exports.table = function (req, res) {
  const db_client = process.env.DB_CLIENT
  const table = req.query.table
  const database = req.query.database
  const offset = req.query.offset
  const interval = 100

  const knex = require('knex')({
    client: db_client,
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: database,
    }
  })

  knex(table)
    .limit(interval)
    .offset(offset)
    .where(true)
    .then(rows => {
      const columns = []
      for (const row of rows) {
        columns.push(Object.keys(row))
      }
      return { columns: columns[0], rows: rows }
    })
    .then(result => res.send(result))
    .catch(err => console.log(err))
    .then(() => knex.destroy())
}
