const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');

const middlewareWrapper = require("cors");
const app = express();
const port  = process.env.PORT || 5000;

// use middleware
app.use(cors());
app.use(express.json());

// user: dbuser1
// password: cZLtZryG92HUA7Zd

const uri = "mongodb+srv://dbuser1:cZLtZryG92HUA7Zd@cluster0.xw2abv6.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        const userCollection = client.db("foodExpress").collection("user");
        const user = {name:'mahiya mahi',email:'mahi@gmail.com'};
        const result = await userCollection.insertOne(user);
        // console.log(`user inserted with id : ${result.insertedId}`);
        console.log(result.insertedId);

    }
    finally{
        // await client.close();
    }

}
run().catch(console.dir);




app.get("/",(req,res)=>{
    res.send('running my node crud server . . .');
})
app.listen(port, () => {
    console.log('CRUD server is running ;');
})