const jwt = require('jsonwebtoken');


exports.getUserId = (request)=> {
  const token = request.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.SECRET);
  const userId = decodedToken.userId;
  return userId;
}