const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT ||5000; 

// middleware 
app.use(cors());
app.use(express.json());

//craftuser
// fz85kvKHBMFybezN


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@atlascluster.6gwdl3v.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

   const craftCollection = client.db('craftdb').collection('craft')

      app.get('/craft',async(req,res)=>{
            const cursor = craftCollection.find()
            const result = await cursor.toArray();
            res.send(result)
      })
      app.get('/view/:id',async(req,res)=>{
         const id = req.params.id;
         const query = {_id : new ObjectId(id)}
         const result = await craftCollection.findOne(query);
         res.send(result)
      })
      app.get('/craft/:id',async(req,res)=>{
         const id = req.params.id;
         const query = {_id : new ObjectId(id)}
         const result = await craftCollection.findOne(query);
         res.send(result)
      })

      app.get('/mycraft/:email',async(req,res)=>{
          console.log(req.params.email);
        const result = await craftCollection.find({email: req.params.email}).toArray();
        res.send(result)
      })
    app.post('/craft',async(req,res)=>{
      const newCraftItem = req.body;
      console.log(newCraftItem)
       const result = await craftCollection.insertOne(newCraftItem)       
       res.send(result)
    })
    app.put('/craft/:id',async(req,res)=>{
      const id = req.params.id
      const filter = {_id: new ObjectId(id)}
      const options = {upsert: true};
      const updatedCraft = req.body;
      const updated = {
        $set: {
          photo: updatedCraft.photo,
          item_name: updatedCraft.item_name,
          customization: updatedCraft.customization,
          processing_time:updatedCraft.processing_time,
          stockstatus: updatedCraft. stockstatus,
          subcategory_name: updatedCraft.subcategory_name,
          shortdescription: updatedCraft.shortdescription,
          rating: updatedCraft.rating,
          price: updatedCraft.price
        }

      }
      const result = await craftCollection.updateOne(filter,updated,options) 
      res.send(result)   
    })
    app.delete('/craft/:id',async(req,res)=>{
      const id = req.params.id;
      const query = {_id : new ObjectId(id)}
      const result = await craftCollection.deleteOne(query)
      res.send(result)
    })   
    


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
//     await client.close();
  }
}
run().catch(console.dir);

app.get('/',(req,res) =>{
     res.send('Art & Craft Store is runnig ')


})

app.listen(port,(req,res)=>{
      console.log(`Art & Craft Store is runnig on Port : ${port}`);
})