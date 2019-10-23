const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const port = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

let users = [
  {
    id: 1,
    username: "batman",
    password: "alfred123"
  },
  {
    id: 2,
    username: "ariel",
    password: "erk33"
  },
  {
    id: 3,
    username: "deadpool",
    password: "killu"
  }
];

app.get("/", (req, res) => {
  res.send(users);
});

app.post("/", (req, res) => {
  // console.log(req.body);
  // console.log(parseInt(req.body.a) + parseInt(req.body.b));
  users.push(req.body);
  res.send("User added");
});

// Sustituir datos del usuario
app.put("/", (req, res) => {
  let id = req.body.id;
  // user[id]

  users.map(users => {
    if ((users.id = req.body.id)) {
      users.username = req.body.username;
      users.password = req.body.password;
    }
  });
  res.send("User Change");
});

app.delete("/", (req, res) => {
  users.splice(parseInt(req.body.id) - 1, 1);
  res.send("User has deleted");
});

app.post("/login", (req, res) => {
  users.map((user, index) => {
    console.log(user, index);
    if (user.username == req.body.username) {
      if (user.passwond == req.body.password) {
        req.send("PUEDES PASAR");
      } else {
        res.send("NO PUEDES PASAR");
      }
    } else {
      res.send("NO EXISTE EL USUARIO");
    }
  });
});

// Metodos:
// delete
// put
// post
// post
// get

// Listen Port
app.listen(port, () => {
  console.log("Server Online");
});
