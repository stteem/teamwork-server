const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const pool = new Pool();

/* const pool = new Pool({
  user: 'uke',
  host: 'localhost',
  database: 'teamwork',
  password: 'tracker',
  port: 5432,
}) */

exports.getUsers = (request, response, next) => {
  pool.query('SELECT * FROM users', (error, res) => {
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


exports.createUser = (request, response, next) => {
  const {
    firstname, lastname, email, password, gender, jobrole, department, address, maritalstatus,
  } = request.body;
  // const hashPassword = bcrypt.hash(password, 10);

  // const hashpw = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  const text = 'INSERT INTO users (firstname, lastname, email, password, gender, jobrole, department, address, maritalstatus) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
  const values = [firstname, lastname, email, password, gender, jobrole, department, address, maritalstatus];

  // Check if email already exists
  pool.query('SELECT email FROM users WHERE email = $1', [email], (error, res) => {
    if (error) {
      console.log(`not able to get connection ${error}`);
      response.status(400).json({
        status: 'error',
        error,
      });
    }
    if (res.rows[0]) {
      console.log(res.rows[0]);
      return response.status(401).send('email already exists!');
    }
    // Create new user if email doesn't exist

    pool.query(text, values, (error, res, body) => {
      if (error) {
        res.status(500).send('server not found');
        throw error;
      }
      return response.status(201).json({
        status: 'success',
        data: {
          message: 'User account successfully created',
          token: 'String',
          userId: res.rows[0].userid,
        },
      });
    });
  });
};


exports.login = (req, res, next) => {
  // const { email, password } = request.body;
  const text = 'SELECT userid, email, password FROM users WHERE email = $1';

  pool.query(text, [req.body.email], (error, response) => {
    if (error) {
      console.log(`not able to get connection ${error}`);
      response.status(400).json({
        status: 'error',
        error,
      });
    }
    if (!response.rows[0]) {
      return res.status(401).send('User not found!');
    }
    bcrypt.compare(req.body.password, response.rows[0].password).then(
      (valid) => {
        if (!valid) {
          return res.status(401).json({
            error: new Error('Incorrect password!'),
          });
        }

        const token = jwt.sign({ userId: response.rows[0].userid }, process.env.SECRET, { expiresIn: '24h' });

        return res.status(200).json({
          userId: response.rows[0].userid,
          token,
        });
      },
    )
      .catch(
        (error) => {
          res.status(500).send({
            error,
          });
        },
      );
  });
};

// module.exports = getUsers;
