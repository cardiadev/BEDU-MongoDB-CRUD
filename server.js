const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const port = 3000;

// Inyeccion de dependencias al proyecto
var MongoClient = require("mongodb").MongoClient;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

require("./routes")(app, MongoClient);

// Listen Port
app.listen(port, () => {
  console.log("Server Online… It's running");
});
