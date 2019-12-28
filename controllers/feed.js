const { Pool } = require('pg');

const pool = new Pool();

/*const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});*/

//const text = 'SELECT imageid as Id, createdon, title, imageurl as url_or_article, userid as authorId FROM images UNION ALL SELECT articleid, createdon, title, article, userid FROM articles ORDER BY createdon DESC LIMIT 20';

/*const union = `WITH A as (SELECT i.imageid as itemid, i.createdon, i.title, i.imageurl as item, i.userid, u.firstname as author 
FROM images i JOIN users u ON i.userid = u.userid UNION ALL SELECT a.articleid, a.createdon, a.title, a.article, a.userid, u.firstname 
FROM articles a JOIN users u ON a.userid = u.userid ORDER BY createdon DESC) 
SELECT row_number() over (order by (select NULL)) as id, itemid, createdon, title, item, userid, author 
INTO feed FROM A`;

exports.getFeed = (request, response) => {
  pool.query('DROP TABLE IF EXISTS feed', (error, res) => {
    if (error) {
      // throw error
      return response.status(400).json({
        status: 'error',
        error: error.stack,
      });
    }
    pool.query(union, (erro, resp) => {
      if (erro) {
        // throw error
        return response.status(400).json({
          status: 'error',
          error: erro.stack,
        });
      }
      pool.query('SELECT * FROM feed', (error3, result) => {
        if (erro) {
          // throw error
          return response.status(400).json({
            status: 'error',
            error: error3.stack,
          });
        }

        //console.log('result', result.rows)
        return response.status(200).json({
          status: 'success',
          data: result.rows,
        });
      })
    })
    
  });
};*/

exports.getFeed = (request, response) => {
  pool.query('SELECT * FROM items ORDER BY createdon DESC', (error, result) => {
    if (error) {
      // throw error
      return response.status(400).json({
        status: 'error',
        error: error.stack,
      });
    }

    //console.log('result', result.rows)
    return response.status(200).json({
      status: 'success',
      data: result.rows,
    });
  })
}