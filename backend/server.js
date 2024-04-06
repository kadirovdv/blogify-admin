const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");

process.on("uncaughtException", (error) => {
  console.log("An unexpected error occurred, stopping the server...");
  console.log(error.message);
  process.exit(1);
});

dotenv.config({ path: path.join(__dirname, ".", "config.env") });

const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  })
  .then((response, error) => {
    console.log("Successfully connected to database...");
  });

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

process.on("unhandledRejection", (error) => {
  console.log(`${error.message}, stopping the server...`);
  server.close(() => {
    process.exit(1);
  });
});
