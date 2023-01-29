const express = require("express");
const port = 8000;
const app = express();
const path = require("path");
// for mongoDB connection
const db = require("./config/mongoose");

app.use(express.urlencoded({ extended: false }));
// set up view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// for routing 
app.use(require("./routes"));
app.use(express.json());
// running our app on port 
app.listen(port, (err) => {
  if (err) {
    console.log(err, "error in listening on port ", port);
    return;
  }
  console.log("app is running successfully on port ", port);
});
