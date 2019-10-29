// Importando archivo db.js para la DB local
// let users = require("./db");

// URL de Mongo Atlas
let url =
  "mongodb+srv://admin:admin@cluster0-76pg3.mongodb.net/test?retryWrites=true&w=majority";

// Config mondoDB que arrojo la consola para que no de Warning
let config = {
  useUnifiedTopology: true
};

var ObjectId = require("mongodb").ObjectId; // INYECTA
// var myquery = { _id: ObjectId(req.body.id) }; // SE USA

module.exports = (app, MongoClient) => {
  // Endpoint GET
  app.get("/", (req, res) => {
    // Linea de comando anterior de forma local
    // res.send(users);
    MongoClient.connect(url, config, function(err, db) {
      if (err) throw err;
      var dbo = db.db("BEDU");
      dbo
        .collection("users")
        .find({})
        .toArray(function(err, result) {
          if (err) throw err;
          console.log(result);
          res.send(result);
          db.close();
        });
    });
  });

  // Endpoint POST -- Para agregar usuarios
  app.post("/", (req, res) => {
    // console.log(req.body);
    // console.log(parseInt(req.body.a) + parseInt(req.body.b));
    //
    // Codigo Anterior de forma local
    // users.push(req.body);
    // res.send("User added");
    //
    MongoClient.connect(url, config, function(err, db) {
      if (err) throw err;
      var dbo = db.db("BEDU");
      var myobj = { username: req.body.username, password: req.body.password };
      dbo.collection("users").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("Numero de datos insertados: " + res.insertedCount);
        db.close();
      });
    });
    res.send("Todo OK");
  });

  // Endpoint PUT -- Sustituir datos del usuario
  app.put("/", (req, res) => {
    // let id = req.body.id;
    // // user[id]

    // users.map(users => {
    //   if ((users.id = req.body.id)) {
    //     users.username = req.body.username;
    //     users.password = req.body.password;
    //   }
    // });
    MongoClient.connect(url, config, function(err, db) {
      if (err) throw err;
      var dbo = db.db("BEDU");
      var myquery = { _id: ObjectId(req.body.id) };
      var newvalues = {
        $set: { username: req.body.username, address: req.body.password }
      };
      dbo.collection("users").updateOne(myquery, newvalues, function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
        db.close();
      });
    });
    res.send("User Change");
  });

  // Endpoint DELETE -- Borrar usuario
  app.delete("/", (req, res) => {
    // CODIGO ANTERIOR -- LOCAL
    // users.splice(parseInt(req.body.id) - 1, 1);
    // res.send("User has deleted");
    MongoClient.connect(url, config, function(err, db) {
      if (err) throw err;
      var dbo = db.db("BEDU");
      var myquery = { _id: ObjectId(req.body.id) };
      dbo.collection("users").deleteOne(myquery, function(err, obj) {
        if (err) throw err;
        console.log("1 documento borrado");
        db.close();
      });
    });
    res.send("Se ELIMINO el usuario");
  });

  // Endpoint POST 2 -- Saber si existe o no el Usuario
  app.post("/login", (req, res) => {
    // users.map((user, index) => {
    //   console.log(user, index);
    //   if (user.username == req.body.username) {
    //     if (user.passwond == req.body.password) {
    //       req.send("PUEDES PASAR");
    //     } else {
    //       res.send("NO PUEDES PASAR");
    //     }
    //   } else {
    //     res.send("NO EXISTE EL USUARIO");
    //   }
    // });
  });
};
