const mongoose = require("mongoose");
require("dotenv").config();

const connectMongo = async () => {
  mongoose.set("strictQuery", true);
  return mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = { connectMongo };
