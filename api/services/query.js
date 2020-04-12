export default class Query {
  query(query, db_client, host, database, user, password) {
    const knex = require('knex')({
      client: db_client,
      connection: {
        host: host,
        user: user,
        password: password,
        database: database,
      }
    })

    return new Promise((resolve, reject) => {
      knex.raw(query)
        .then(queryResult => JSON.parse(JSON.stringify(queryResult)))
        .then(queryResult => queryResult[0])
        .then(queryResult => resolve(JSON.stringify(queryResult)))
        .catch(err => reject(err))
    })
  }
}
