import express from 'express'
import Mocker from 'mockjs'
 
let app = express();
const url = "/stock";

// app.use('/stock', function(req, res){
//     res.json(Mocker.mock({
//         "machine_id":   "123", 
//         "timestamp":    "1576668793061", 
//         "temperature":  99.2,
//         "data": "aaaaaaaa"
//     }))
// })

module.exports = [Mocker.mock('/stock', {
        "machine_id":   "123", 
        "timestamp":    "1576668793061", 
        "temperature":  99.2,
        "data": "aaaaaaaa"
    })
]

 
// app.listen('4000', () => {
//     console.log('listening port 4000');
// });