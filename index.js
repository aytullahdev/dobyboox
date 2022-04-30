const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');

require('dotenv').config()
const app = express();
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.rph41.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    try{
        await client.connect();
        const userCollection = client.db("dobybox").collection('products');
        const product = {name:'Shoes',desc:'If a dog chews shoes whose shoes does he choose?',price:120,supplier:'ayt',quan:20,img:'https://api.lorem.space/image/shoes?w=400&h=225'};
       //const result = await userCollection.insertOne(product);
        console.log("product inserted");

    }finally{

    }
}

run().catch(console.dir);
app.listen(5000,()=>{
    console.log("Server is working");
    
})