const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config()
const app = express();
app.use(cors())
app.use(express.json())
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.rph41.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    try{
        await client.connect();
        const userCollection = client.db("dobybox").collection('products');
        // JWT TOKEN INITIALIZATION
        app.post('/login',(req,res)=>{
            console.log(req.body);
            const actoken=jwt.sign(req.body,process.env.ACC_TOKEN,{
                expiresIn:'1d'
            })
            res.send({token:actoken});
        })
        // Add Product
        app.post('/addproduct',async(req,res)=>{
            const tempdata=req.body;
            const data = {name:tempdata.pname,price:tempdata.pprice,quan:tempdata.pquan,supplier:tempdata.psupplier,img:tempdata.pimg,desc:tempdata.pdesc}
            const result = await userCollection.insertOne(data);
            res.send(result);
        })
        // Get All products
        app.get('/products',async(req,res)=>{
            const querry={};
            const cursor = userCollection.find(querry);
            const products = await cursor.toArray();
            res.send(products);
        })
        // Get Single Products
        app.get('/products/:id',async(req,res)=>{
           
            const querry={_id: ObjectId(req.params.id)};
            const result = await userCollection.findOne(querry);
            
            res.send(result);
        })
        // Get all product by Supplier Id-> Email
        app.get('/productsby/:id',async(req,res)=>{
            
            const querry={supplier: req.params.id};
            const cursor =  userCollection.find(querry);
            const result = await cursor.toArray()
            res.send(result);
        })
        // Update an product
        app.post('/update',async(req,res)=>{
            const id = req.body._id;
            const newquan = req.body.quan;
            const querry={_id:ObjectId(id)};
            const newvalue = {$set: {quan:newquan}};
            const result = await userCollection.updateOne(querry,newvalue);
            res.send(result);
        })
        // Delete a product 
        app.delete('/products',async(req,res)=>{
            const querry={_id: ObjectId(req.body._id)};
            const result = await userCollection.deleteOne(querry);
            res.send(result);
        })

    }finally{

    }
}

run().catch(console.dir);
app.listen(port,()=>{
    console.log("Server is working");
    
})