const { Pool } = require('pg');

//const pool = new Pool();

const pool = new Pool({
  user: 'uke',
  host: 'localhost',
  database: 'teamwork',
  password: 'tracker',
  port: 5432,
})

exports.getUsers = (request, response, next) => {
  pool.query('SELECT * FROM users', (error, res) => {
    if (error) {
      //throw error
      console.log("not able to get connection "+ error);
      response.status(400).json({
      	'status': 'error',
      	'error': error.stack
      });
    }
    response.status(200).json({
    	'status': 'success',
    	'data': res.rows
    })
  })
}


exports.createUser = (request, response, next) => {
  const { firstname, lastname, email, password, gender, jobrole, department, address, maritalstatus } = request.body;
  const text = 'INSERT INTO users (firstname, lastname, email, password, gender, jobrole, department, address, maritalstatus) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
  const values = [firstname, lastname, email, password, gender, jobrole, department, address, maritalstatus];

  pool.query(text, values, (error, res, body) => {
    if (error) {
      throw error
    }
    response.status(201).json({
    	'status': 'success',
  		'data' : {
  			'message': 'User account successfully created',
  			'token': 'String',
  			'statusCode': response.statusCode
  		}
    })
  })
}

//module.exports = getUsers;