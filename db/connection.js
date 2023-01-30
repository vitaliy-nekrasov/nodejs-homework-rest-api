const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URL = process.env.MONGO_URL;

const connectMongo = async () => {
  mongoose.set("strictQuery", true);
  return mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = { connectMongo };
