const { Pool } = require('pg');

/*const pool = new Pool({
  user: 'uke',
  host: 'localhost',
  database: 'teamwork',
  password: 'tracker',
  port: 5432,
})*/

const pool = new Pool();

const getUsers = (request, response) => {
  pool.query('SELECT * FROM users WHERE id = $1', [1], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = getUsers;