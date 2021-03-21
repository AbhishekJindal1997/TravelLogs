const express = require("express");
const morgan = require("morgan"); // Eveytime request comes in we are gonna see that
const helmet = require("helmet"); // For safety , adds headers
const cors = require("cors"); // For Cross Origin
const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");

// Environment Variables
require("dotenv").config();

const middlewares = require("./middlewares");
const logs = require("./api/logs");
// const User = require("./module/api/User");
// const auth = require("./module/api/auth");

// app config
const app = express();

// Connect to MongoDB
const OPTS = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(process.env.DATABASE_URL, OPTS)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

app.use(morgan("common"));
app.use(helmet());
app.use();
app.use(express.json());

// // api routes for Home Page
app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/api/logs", logs);
// app.use("/api/user", User);
// app.use("/api/auth", auth);

// middlewares
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 1337;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port} \nserver up and running`);
});
