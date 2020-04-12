exports.tables = function (req, res) {
  const db_client = process.env.DB_CLIENT
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

  knex.raw('SHOW TABLES')
    .then(queryResult => JSON.parse(JSON.stringify(queryResult)))
    .then(queryResult => queryResult[0].map(row => row['Tables_in_' + database]))
    .then(queryResult => res.send(JSON.stringify(queryResult)))
}
