require("dotenv").config();
const express = require('express')
const app = express()
const router = require('./routes')
const bodyparser = require('body-parser')
const cors = require('cors')

app.use(cors({
    origin: '*'
}))

app.use(bodyparser.json())

app.use("/api", router)

app.use(function(err, req, res, next) {
    if(err.status){
        res.status(err.status).json(err)
    }else{
        console.log(err)
        res.status(500).json({message:"Internal server error"})
    }
});


module.exports = app