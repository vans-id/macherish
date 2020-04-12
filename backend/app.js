const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts");

mongoose
  .connect(
    "mongodb+srv://djevann:wanipira1111@cluster0-hohuj.gcp.mongodb.net/macherish?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("connected to database!");
  })
  .catch(() => {
    console.log("conenction error");
  });

const app = express();

// CORS Middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, DELETE"
  );
  next();
});

app.use(bodyParser.json());
app.use("/api/posts", postsRoutes);
app.use("/images", express.static(path.join("backend/images")));

module.exports = app;
