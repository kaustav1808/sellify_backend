require('dotenv').config()
const app = require('./app')
const port = process.env.PORT || 8000;
const {db} = require('./config')

db.connect().then(()=>{
    console.log('Connection to the database successfully done ...!!!!')
    app.listen(port, ()=>{
        console.log(`Express server is listening on port ${port}`)
    })
}).catch(e =>{
    console.log(e)
    process.exit(1)
})
