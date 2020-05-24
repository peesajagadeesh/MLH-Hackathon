const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const app = express();

app.set('view engine','ejs');

// Replace the following with your Atlas connection string

const url = "mongodb+srv://admin-jagadeesh:Test123@cluster0-nykac.mongodb.net/mlhDB?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true";

const client = new MongoClient(url);


// mongoose.connect("mongodb+srv://admin-jagadeesh:Test123@cluster0-nykac.mongodb.net/mlhDB",{useNewUrlParser: true});
// mongoose.set("useCreateIndex", true);

const mlhDBSchema= {
  Place : String,
  Link : String
};

const Item = mongoose.model("Item",mlhDBSchema);
//mlhDBSchema.plugin(find);

   // The database to use
   const dbName = "mlhDB";

   async function run() {
      try {
           await client.connect();
           console.log("Connected correctly to server");
           const db = client.db(dbName);

           // Use the collection "people"
           const col = db.collection("Item");

           // Construct a document
           // let personDocument = {
           //     "name": { "first": "Alan", "last": "Turing" },
           //     "birth": new Date(1912, 5, 23), // June 23, 1912
           //     "death": new Date(1954, 5, 7),  // June 7, 1954
           //     "contribs": [ "Turing machine", "Turing test", "Turingery" ],
           //     "views": 1250000
           // }
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

       finally {
          await client.close();
      }
  }

  run().catch(console.dir);


// Item.insertOne(WinterObject);
// Item.insertMany(SummerrObject);
app.get("/", function(req,res){
  console.log("2");
  Item.find({},function(err,foundItems){
    console.log("1");
    console.log(foundItems);
    if (!err){
    res.render("home",{Places :foundItems});
  }
  else {
    console.log(err);
  }

})

});



app.get("/:placeId",function(req,res) {
  const requestedplaceId  = req.params.placeId;

  Item.findOne({Place : requestedplaceId},function(err,item){
    res.render("template",{title:item.Place,
    Link:item.Link })
  })
})


app.listen(3000,function(){
  console.log("Server started on port 3000");
});









// app.get("/1",function(req,res){
//   res.render("summer");
// })
// app.get("/2",function(req,res){
//   res.render("winter");
// })
// app.get("/3",function(req,res){
//   res.render("rainy");
// })
