exports.databases = function(req, res) {
  const db_client = process.env.DB_CLIENT
  const knex = require('knex')({
    client: db_client,
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    }
  })

  knex.raw('SHOW DATABASES')
    .then(queryResult => JSON.parse(JSON.stringify(queryResult)))
    .then(queryResult => queryResult[0].map(row => row['Database']))
    .then(queryResult => res.send(JSON.stringify(queryResult)))
}
