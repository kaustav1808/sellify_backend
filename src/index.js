require('dotenv').config()
const mongoose = require('mongoose')
const app = require('./app')
const port = process.env.PORT || 8000;
const mongodb_connection = process.env.DB_CONNECTION || 'mongodb://localhost:27017'

mongoose.connect(mongodb_connection).then(()=>{
    console.log('Connection to the database successfully done ...!!!!')
    app.listen(port, ()=>{
        console.log(`Express server is listening on port ${port}`)
    })
}).catch(e =>{
    console.log(e)
    process.exit(1)
})
