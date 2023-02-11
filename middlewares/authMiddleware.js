const jwt = require("jsonwebtoken");
const { User } = require("../db/usersSchema");
require("dotenv").config();

const JWT_SECRET = String(process.env.JWT_SECRET);

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      next(
        res.status(401).json({
          message: "Token not found",
        })
      );
    }

    const [tokenType, token] = req.headers.authorization.split(" ");
    if (tokenType !== "Bearer" || !token) {
      next(
        res.status(401).json({
          message: "Token not found",
        })
      );
    }

    const { _id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(_id);

    if (!user || !user.token) {
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

module.exports = { authMiddleware };
