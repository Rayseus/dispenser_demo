/*
Date: Feb.26.2020
Author: Ray
This App is a beverage dispenser simulator with maintainance display,
This is server code with node.js and express
It will mock a server for beverage dispenser wotking
*/

let express = require('express');
let app = express();
let Mock = require('mockjs');
let bodyParser = require('body-parser');
let timestamp = 0;
let temp = 0;
let id = 0;

//set header for data transfer
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//get temperature from front-end recorded
app.post('/temp', function(req, res) {
    timestamp = req.body.timestamp
    temp = req.body.temp
    console.log(req.body)
})

//send tempuratures to front-end
app.use('/temp', function(req, res) {
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Accept', 'application/json')
    id = id + 1
    res.json({
        "id": id,
        "timestamp": timestamp,
        "temp": temp
    })    
})

//mock stock
app.use('/stock',function(req, res){
    res.json(Mock.mock([
        
        {
            "id": 1,
            "product": "tea",
            "stock": 25
        },
        {
            "id": 2,
            "product": "coffee",
            "stock": 25
        },
        {
            "id": 3,
            "product": "milk",
            "stock": 25
        },
        {
            "id": 4,
            "product": "sugar",
            "stock": 25
        }
    ]))
})


app.listen('4000', () => {
    console.log('listening port 4000');
});