const mongoose = require('mongoose')

const mongodbConnection =
    process.env.DB_CONNECTION || 'mongodb://localhost:27017/'

const getDBName = () => {
    if (process.env.NODE_ENV === 'development') return 'dev_db'
    if (process.env.NODE_ENV === 'test') return 'test_db'
    if (process.env.NODE_ENV === 'production') return 'production'
    return 'demo'
}

module.exports = {
    connect: async () => {
        const url = `${
            mongodbConnection + getDBName()
        }?retryWrites=true&w=majority`
        return mongoose.connect(url)
    },
    seeder: {
        dropCollection: false,
        truncateData: true,
    }
}
