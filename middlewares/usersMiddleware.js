const jwt = require("jsonwebtoken");

const JWT_SECRET = String(process.env.JWT_SECRET);

const usersMiddleware = (req, res, next) => {
  const [tokenType, token] = req.headers.authorization.split(" ");
  console.log(tokenType);
  try {
    const user = jwt.decode(token, JWT_SECRET);
    console.log(user);
    if (!user) {
      next(
        res.status(401).json({
          message: "Not authorized",
        })
      );
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { usersMiddleware };
