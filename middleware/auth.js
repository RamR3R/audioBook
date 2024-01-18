const jwt = require('jsonwebtoken');
require("dotenv").config();

const authenticateUser = (req, res, next) => {
  // Get token from the request headers or cookies or wherever you are sending it
  const token = req.header('Authorization').split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication failed. Token not provided.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.secretKey); 

    // Attach user details to the request for further use in the route handlers
    req.user = decoded.user;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed. Invalid token.' });
  }
};

module.exports = authenticateUser;
