const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    const error = new Error("Not Authenticated, No Token detected");
    err.statusCode = 401;
    throw err;
  }
  const token = authHeader.split("")[1];
  let checkToken;
  try {
    checkToken = jwt.verify(token, process.env.SECRET);
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
  if (!revisarToken) {
    const error = new Error("Not Authenticated");
    error.statusCode = 403;
    throw error;
  }
  next();
};
