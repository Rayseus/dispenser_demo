import express from 'express'
import Mocker from 'mockjs'
 
//var app = express();
const url = "/stock";

export default Mocker.mock('/stock', {
        "machine_id":   "123", 
        "timestamp":    "1576668793061", 
        "temperature":  99.2
    })


 
//app.listen(4000);