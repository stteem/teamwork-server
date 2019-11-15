const express = require('express');
const bodyParser = require('body-parser');

//const path = require('path');
const feedRoutes = require('./routes/feed');
const userRoutes = require('./routes/user');
const gifRoutes = require('./routes/gif');
const articleRoutes = require('./routes/article');

const app = express();



app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// parse request body into a json object
app.use(bodyParser.json());

app.use('/api/v1/', feedRoutes);
app.use('/api/v1/', userRoutes);
app.use('/api/v1/', gifRoutes);
app.use('/api/v1/', articleRoutes);





module.exports = app;
