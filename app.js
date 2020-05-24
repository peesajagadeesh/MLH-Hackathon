const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const app = express();

app.set('view engine','ejs');

// Replace the following with your Atlas connection string

const url = "mongodb+srv://admin-jagadeesh:Test123@cluster0-nykac.mongodb.net/mlhDB?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true";

const client = new MongoClient(url);


   // The database to use
   const dbName = "mlhDB";
    let db;


   // async function getele() {
   // await client.connect();
   // console.log("Connected correctly to server");
   // const db = client.db(dbName);

   async function run() {
      try {
           await client.connect();
           console.log("Connected correctly to server");
             db = client.db(dbName);

           // Use the collection "people"
           const col = db.collection("Item");


           let WinterObject=
             {
               Place: "Winter",
               Link : "https://www.youtube.com/watch?v=a_oqcg0hvpo"
             }
             let SummerrObject=
             {
               Place: "Summer",
               Link : "https://www.youtube.com/watch?v=hjKO0d_umLc"
             }

           // Insert a single document, wait for promise so we can read it back
           // const p = await col.insertOne(WinterObject);
           // const p1 = await col.insertOne(SummerrObject);
           // Find one document
           // const myDoc = await col.findOne();
           // // Print to the console
           // console.log(myDoc);

          } catch (err) {
           console.log(err.stack);
       }

      //  finally {
      //     await client.close();
      // }
  }

  run().catch(console.dir);


// Item.insertOne(WinterObject);
// Item.insertMany(SummerrObject);
var query = { };


app.get("/", function(req,res){
    console.log("2");
  db.collection("Item").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
//   Item.find({},function(err,foundItems){
//     console.log("1");
//     console.log(foundItems);
//     if (!err){
res.render("home",{Places: result});
/
});
});
// app.post("/",function(req,res){
//   const
// })

app.get("/:placeId",function(req,res) {
  const requestedplaceId  = req.params.placeId;
  var query1 = {Place: requestedplaceId};

  db.collection("Item").findOne(query).toArray(function(err, result1) {
    if (err) throw err;
    console.log(result1);


  // Item.findOne({Place : requestedplaceId},function(err,item){
    res.render("template",{title:result1.Place,
    Link:result1.Link })
  // })
})
});


var server = app.listen(3000,function(){
  console.log("Server started on port 3000");
});

// server.close(function(){
//   client.close();
// })







// app.get("/1",function(req,res){
//   res.render("summer");
// })
// app.get("/2",function(req,res){
//   res.render("winter");
// })
// app.get("/3",function(req,res){
//   res.render("rainy");
// })
