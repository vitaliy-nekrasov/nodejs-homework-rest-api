const app = require("./app");
require("dotenv").config();
const { connectMongo } = require("./db/connection");

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    await connectMongo();
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  } catch (error) {
    console.log("Database connection failed");
    process.exit(1);
  }
};

startServer();
