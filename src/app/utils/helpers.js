const isEmpty = (obj) =>
    obj &&
    Object.keys(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype

const getPort = () => process.env.PORT || 8000    
const getHost = () => process.env.HOSTNAME || `http://localhost:${getPort()}`    

module.exports = { isEmpty, getPort, getHost }
