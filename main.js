const { MongoClient } = require('mongodb');
const dotenv = require('dotenv').config({ path: 'environment/config.env' }) ;
const client = new MongoClient(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const express = require('express');
const app = express();
const port = process.env.PORT | 3000;
const mongoose = require('mongoose');
const userSchema = require('./schemes/user').userSchema;
const productSchema = require("./schemes/product").productSchema;
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
    const Product = mongoose.model('Product' , productSchema);
    // const testProduct = new Product({
    //     name: "Paine prajita",
    //     listPrice: "19.99",
    //     currentPrice: "15.99",
    // });
    // testProduct.save(function (err , product){
    //     if(err) return console.error(err);
    //     console.log(product);
    // });
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
