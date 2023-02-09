const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = String(process.env.JWT_SECRET);

const authMiddleware = (req, res, next) => {
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
    jwt.verify(token, JWT_SECRET, (err, decode) => {
      if (err) {
        next(
          res.status(401).json({
            message: "Not authorized",
          })
        );
      }
      req.user = decode;
    });
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { authMiddleware };
