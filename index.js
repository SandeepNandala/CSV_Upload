const express = require("express");
const port = 8000;
const app = express();
const path = require("path");
// const cookieParser = require("cookie-parser");
const db = require("./config/mongoose");

app.use(express.urlencoded({ extended: false }));
// set up view engine
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("assets")); //for stastic files(css,js,images...etc)

// app.use(cookieParser());
app.use(require("./routes"));
app.use(express.json());

app.listen(port, (err) => {
  if (err) {
    console.log(err, "error in listening on port ", port);
    return;
  }
  console.log("app is running successfully on port ", port);
});
