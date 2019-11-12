const { Pool } = require('pg');

const pool = new Pool();


exports.getFeed = (request, response) => {
  pool.query('SELECT * FROM images', (error, res) => {
    if (error) {
      // throw error
      console.log(`not able to get connection ${error}`);
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