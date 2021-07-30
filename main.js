const { MongoClient } = require('mongodb');
const dotenv = require('dotenv').config({ path: 'environment/config.env' }) ;
const client = new MongoClient(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const express = require('express');
const app = express();
const port = process.env.PORT | 3000;
const mongoose = require('mongoose');
const userSchema = require('./schemes/user').userSchema;

function init(){
    console.log(port);
    client.connect();
}

function main(){
    mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
    const db=mongoose.connection;
    const User=mongoose.model('User',userSchema);
    // const testUser=new User({email:"mihai2.indreias@gmail.com",
    //                             //firstName:"Mihai2 ",
    //                             lastName:"Indreias",
    //                             password:"11234",
    //     });
    // testUser.save(function (err, fluffy) {
    //     if (err) return console.error(err);
    //     console.log(fluffy);
    //   });

    app.get('/',(req,res)=>{
        res.status(200).send("Up and running");
    });
    app.listen(port,()=>{
        console.log(`Started listening on port ${port}`);
    });

    client.close();
}

init();
main();
