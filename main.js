const { MongoClient } = require('mongodb');
const dotenv = require('dotenv').config({ path: 'environment/config.env' }) ;
const client = new MongoClient(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const express = require('express');
const app = express();
const port = process.env.PORT | 3000;

function init(){
    console.log(port);
    client.connect();
}

function main(){
 
    app.get('/',(req,res)=>{
        res.status(200).send("Up and running");
    });
    app.listen(port,()=>{
        console.log(`Started listening on port ${port}`);
    })
}

init();
main();
