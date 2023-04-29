const swaggerAutogen = require('swagger-autogen')
const spec = require('./src/config/documentation')

const outPutFile = './src/config/swaggerDoc.json'
const endPointFiles = ['./src/app/routes/index.js']
console.log(spec.getBaseDefinition())
swaggerAutogen(outPutFile, endPointFiles, spec.getBaseDefinition())
