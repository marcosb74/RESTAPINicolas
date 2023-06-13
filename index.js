const express = require("express");
const routes = require("./routes/index.js");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
//Connecting mongoDb
mongoose.promise = global.promise;
mongoose.connect("mongodb://localhost/restapi", {
  useNewUrlParser: true,
});

//Creating the Server
const app = express();

//Enabling bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", routes());

//Setting the port to listen
app.listen(5500);
