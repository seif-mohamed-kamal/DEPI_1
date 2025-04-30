require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT;

const postRoute = require("./routes/postRoute");

// Parse the body of the request
app.use(express.json());

// Connect to the DB
mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;
if (db) {
  console.log("Database Connected");
}

app.use("/api/v1", api);

app.listen(port, () => {
  console.log(`Server is running...`);
});
