const { Pool } = require('pg')

const pool = new Pool()

/* const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
}); */

exports.getFeed = (request, response) => {
  //console.log("someone's calling now holy shit")
  const select = `SELECT i.itemid, i.imageurl, i.article, i.title, i.userid, i.createdon, u.firstname,
                 u.lastname FROM items i JOIN users u ON i.userid = u.userid ORDER BY createdon DESC`

  pool.query(select, (error, result) => {
    if (error) {
      // throw error
      return response.status(400).json({
        status: 'error',
        error: error.stack
      })
    }

    // console.log('result', result.rows)
    return response.status(200).json({
      status: 'success',
      data: result.rows
    })
  })
}
