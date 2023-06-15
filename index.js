const dotenv = require("dotenv");
const express = require("express");
const routes = require("./routes/index.js");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

dotenv.config({ path: ".env" });

//Connecting mongoDb
mongoose.promise = global.promise;
mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
});

//Creating the Server
const app = express();

//Setting up the port
const port = process.env.PORT || 5500;

//Enabling bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", routes());

//Setting the port to listen
app.listen(port);
