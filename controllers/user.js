const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//const pool = new Pool();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});


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


exports.createUser = (request, response) => {
  const { firstname, lastname, email, password, gender, jobrole, department, address, maritalstatus, isadmin } = request.body;
  // const hashPassword = bcrypt.hash(password, 10);
  const hashpw = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  const time = new Date();
  const text = 'INSERT INTO users (firstname, lastname, email, password, gender, jobrole, department, address, maritalstatus, date, isadmin) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *';
  const values = [firstname, lastname, email, hashpw, gender, jobrole, department, address, maritalstatus, time, isadmin];
    

  // Check if email already exists
  pool.query('SELECT email FROM users WHERE email = $1', [email], (err, result) => {
    if (err) {
      return response.status(400).json({
        status: 'error',
        err,
      });
    }
    if (result.rows[0]) {
      return response.status(401).send('email already exists!');
    }

    // Create new user if email doesn't exist

    pool.query(text, values, (error, res) => {
      if (error) {
       return response.status(500).send('server not found');
      }

      const token = jwt.sign({ userId: res.rows[0].userid }, process.env.SECRET, { expiresIn: '24h' });

      response.statusCode = 201;
      response.setHeader('Content-Type', 'application/json');
      response.json({
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

  const text = 'SELECT userid, email, password, firstname, isadmin FROM users WHERE email = $1';

  pool.query(text, [req.body.email], (error, response) => {
    if (error) {
      return res.status(500).json({
        error: new Error('Internal server error!'),
      });
    }
    if (!response.rows[0]) {
      console.log('user not found')
      return res.status(400).json();
    }
    bcrypt.compare(req.body.password, response.rows[0].password).then(
      (valid) => {
        if (!valid) {
          return res.status(401).json({
            error: new Error('Incorrect password!'),
          });
        }


        // expiresIn : 60, "2 days", "10h", "24h" "7d"
        const token = jwt.sign({ userId: response.rows[0].userid }, process.env.SECRET, { expiresIn: '7d' });
        console.log('response', response.rows[0])
        res.status(200).json({
          userid: response.rows[0].userid,
          firstname: response.rows[0].firstname,
          isadmin: response.rows[0].isadmin,
          token,
        });
      },
    )
    .catch(
      (err) => {
        res.status(400).send( err );
      },
    );
  });
};

// module.exports = getUsers;
