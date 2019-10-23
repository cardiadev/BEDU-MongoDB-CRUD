const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const port = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

require("./routes")(app);

// Listen Port
app.listen(port, () => {
  console.log("Server Online");
});
