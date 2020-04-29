exports.tableMeta = function (req, res) {
  const db_client = process.env.DB_CLIENT
  const table = req.query.table
  const database = req.query.database

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
    .count('*')
    .then(result => res.send(result))
    .catch(err => console.log(err))
    .then(() => knex.destroy())
}
