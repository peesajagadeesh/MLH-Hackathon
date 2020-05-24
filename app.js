const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const app = express();

app.set('view engine','ejs');

const url = "mongodb+srv://admin-jagadeesh:Test123@cluster0-nykac.mongodb.net/mlhDB?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true";
const client = new MongoClient(url);
const dbName = "mlhDB";
let db;

async function run() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    db = client.db(dbName);
  } catch (err) {
    console.log(err.stack);
  }
}
run().catch(console.dir);


app.get("/", function(req, res){
  const query = {};
  db.collection("Item").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    res.render("home",{Places: result});
  });
});

app.get("/:placeId",function(req, res) {
  const requestedplaceId  = req.params.placeId;
  const query = {}; //{Place: requestedplaceId};

  const promise = db.collection("Item").findOne(query);
  promise.then(item => {
    console.log(item);
    res.render("template",{ title:item.Place, Link:item.Link })
  }).catch(err => console.log(err))
});

app.listen(3000,function(){
  console.log("Server started on port 3000");
});

