const express = require("express");
const routes = reqire("./routes/index.js");
const mongoose = require("mongoose");
//Connecting mongoDb
mongoose.promise = globa.promise();
mongoose.connect("mongodb://localhost/restapi", () => {
  useNewUrlParser: true;
});

//Creating the Server
const app = express();

app.use("/", routes());

//Setting the port to listen
app.listen(5000);
