const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const pool = new Pool();


exports.createUser = (request, response) => {
  const {
    firstname, lastname, email, password, gender, jobrole, department, address, maritalstatus,
  } = request.body;
  // const hashPassword = bcrypt.hash(password, 10);
  const hashpw = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  const time = new Date();
  const text = 'INSERT INTO users (firstname, lastname, email, password, gender, jobrole, department, address, maritalstatus, date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *';
  const values = [firstname, lastname, email, hashpw, gender,
    jobrole, department, address, maritalstatus, time];
    

  // Check if email already exists
  pool.query('SELECT email FROM users WHERE email = $1', [email], (err, result) => {
    if (err) {
      response.status(400).json({
        status: 'error',
        err,
      });
    }
    if (result.rows[0]) {
      return response.status(401).send('email already exists!');
    }

    // Create new user if email doesn't exist

    return pool.query(text, values, (error, res) => {
      if (error) {
        res.status(500).send('server not found');
        throw error;
      }

      const token = jwt.sign({ userId: res.rows[0].userid }, process.env.SECRET, { expiresIn: '24h' });

      response.status(201).json({
        status: 'success',
        data: {
          message: 'User account successfully created',
          token,
          userId: res.rows[0].userid,
        },
      });
    });
  });
};


exports.login = (req, res) => {
  // const { email, password } = request.body;
  const text = 'SELECT userid, email, password FROM users WHERE email = $1';

  pool.query(text, [req.body.email], (error, response) => {
    if (error) {
      response.status(400).json({
        status: 'error',
        error,
      });
    }
    if (!response.rows[0]) {
      return res.status(401).send('User not found!');
    }
    return bcrypt.compare(req.body.password, response.rows[0].password).then(
      (valid) => {
        if (!valid) {
          res.status(401).json({
            error: new Error('Incorrect password!'),
          });
        }

        const token = jwt.sign({ userId: response.rows[0].userid }, process.env.SECRET, { expiresIn: '24h' });

        res.status(200).json({
          userId: response.rows[0].userid,
          token,
        });
      },
    )
      .catch(
        (err) => {
          res.status(500).send({
            err,
          });
        },
      );
  });
};

// module.exports = getUsers;
