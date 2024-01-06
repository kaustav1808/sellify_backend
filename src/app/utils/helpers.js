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

const getRandomColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16)
    return `#${randomColor}`
}

const getTags = (tags) => {
    if (!tags.length) return []

    return tags.map((o) =>
        typeof o === 'object' ? o : { tag: o, colorCode: getRandomColor() }
    )
}

module.exports = {
    isEmpty,
    getPort,
    getHost,
    getHostUrl,
    getRandomColor,
    getTags,
}
