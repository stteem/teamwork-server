const { Pool } = require('pg');

//const pool = new Pool();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

const text = 'SELECT imageid as Id, createdon, title, imageurl as url_or_article, userid as authorId FROM images UNION ALL SELECT articleid, createdon, title, article, userid FROM articles ORDER BY createdon DESC LIMIT 20';

exports.getFeed = (request, response) => {
  pool.query(text, (error, res) => {
    if (error) {
      // throw error
      response.status(400).json({
        status: 'error',
        error: error.stack,
      });
    }
    response.status(200).json({
      status: 'success',
      data: res.rows,
    });
  });
};
