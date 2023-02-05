const jwt = require("jsonwebtoken");

const JWT_SECRET = String(process.env.JWT_SECRET);

const usersMiddleware = (req, res, next) => {
  if (!req.headers.authorization) {
    next(
      res.status(401).json({
        message: "Token not found",
      })
    );
  }
  const [tokenType, token] = req.headers.authorization.split(" ");
  console.log(tokenType);
  try {
    const user = jwt.decode(token, JWT_SECRET);
    if (!user) {
      next(
        res.status(401).json({
          message: "Not authorized",
        })
      );
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { usersMiddleware };
