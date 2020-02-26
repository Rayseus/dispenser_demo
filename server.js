//import express from 'express'
//import Mocker from 'mockjs'
 
let express = require('express');
let app = express();
let Mock = require('mockjs');
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : false}));
// app.use('/temp/', function(req, res){
//     console.log(res.body)
// })
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/', function(req, res){
    res.send('hello')
})

app.use('/temp',function(req, res){
    res.json(Mock.mock([
        {
            "id":   "1", 
            "timestamp":    "1576668793061", 
            "temperature":  99.2
        },
        {
            "id":   "2", 
            "timestamp":    "1576668793061", 
            "temperature":  90.2
        }
    ]))
})

app.use('/stock',function(req, res){
    res.json(Mock.mock([
        
        {
            "id": 1,
            "product": "tea",
            "stock": 10
        },
        {
            "id": 2,
            "product": "coffee",
            "stock": 10
        },
        {
            "id": 3,
            "product": "milk",
            "stock": 5
        },
        {
            "id": 4,
            "product": "sugar",
            "stock": 5
        }
    ]))
})


app.listen('4000', () => {
    console.log('listening port 4000');
});