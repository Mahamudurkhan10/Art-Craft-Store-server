const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.PORT ||5000; 

// middleware 
app.use(cors());
app.use(express());


app.get('/',(req,res) =>{
     res.send('Art & Craft Store is runnig ')


})

app.listen(port,(req,res)=>{
      console.log(`Art & Craft Store is runnig on Port : ${port}`);
})