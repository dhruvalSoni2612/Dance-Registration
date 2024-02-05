const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
const port = 8000;

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String
  });
const Contact = mongoose.model('Contact', contactSchema);


app.use('/static',express.static('static'));
app.use(express.urlencoded());

app.set('view engine','pug')
app.set('views',path.join(__dirname,'views'));

app.get('/home',(req,res)=>{
    const param = {}
    res.status(200).render('home.pug',param)
})

app.get('/contact',(req,res)=>{
    const param = {}
    res.status(200).render('contact.pug',param)
})

app.post('/contact',(req,res)=>{
    const myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("We will reached to you soon, Thank You.")
    }).catch((err)=>{
        res.status(400).send("item not send")
    });
    // res.status(200).render('contact.pug')
})

app.listen(port, ()=>{
    console.log(`application started on port ${port}`)
})