const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const objectId = require('mongodb').objectId;

const app = express();
const port  = process.env.PORT || 5000;

// use middleware
app.use(cors());
app.use(express.json());

// user: dbuser02
// password: PCU5iuAE6Uq6qysH
const uri = "mongodb+srv://dbuser02:PCU5iuAE6Uq6qysH@cluster0.xw2abv6.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        const userCollection = client.db("foodExpress").collection("user");
        // get users 
        app.get('/user',async(req,res)=>{
            const query = {};
            const cursor = userCollection.find(query);
            const users = await cursor.toArray();
            res.send(users);
        })
        // post user : add a new user
        app.post('/user',async(req,res)=>{
            const newUser = req.body ;
            console.log('adding new user',newUser)
            const result = await userCollection.insertOne(newUser) ;
            res.send(result)
        })
        // delete a user 
        app.delete('/user/:id',async(req,res)=>{
            const id = req.params.id;
            const query = {_id:objectId(id)} ;
            // const result = await /.deleteOne(query);
        })
    }
    finally{
        // await client.close();   
    }
}
run().catch(console.dir);

app.get("/",(req,res)=>{
    res.send("running my node crud server");
})
app.listen(port, () => {
    console.log("CRUD server is running ;");
})
