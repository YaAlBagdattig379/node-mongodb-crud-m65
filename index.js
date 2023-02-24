const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

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
        app.post('/user',(req,res)=>{
            const newUser = req.body;
            console.log('adding new user',newUser);
            // res.send('user data received')
            res.send({result:'success user data received'})
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
