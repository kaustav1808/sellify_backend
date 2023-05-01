const isEmpty = (obj) =>
    obj &&
    Object.keys(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype

const getPort = () => process.env.PORT || 8080
const getHost = () => process.env.HOSTNAME || `http://localhost:${getPort()}`
const getHostUrl = (url) => {
    const resurl = url || getHost()

    if (resurl.startsWith('https://')) {
        const https = 'https://'
        return resurl.slice(https.length)
    }

    if (resurl.startsWith('http://')) {
        const http = 'http://'
        return resurl.slice(http.length)
    }

    return resurl
}

module.exports = { isEmpty, getPort, getHost, getHostUrl }
