import Query from '../services/query'

exports.query = function (req, res) {
  const db_client = process.env.DB_CLIENT
  const database = req.query.database
  const query = req.query.query
  const host = process.env.DB_HOST
  const user = process.env.DB_USER
  const password = process.env.DB_PASSWORD

  const queryObject = new Query()
  queryObject.query(query, db_client, host, database, user, password)
    .then(queryResult => res.send(queryResult))
    .catch(err => res.sendStatus(500))
}
