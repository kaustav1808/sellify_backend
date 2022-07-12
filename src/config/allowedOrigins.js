let origins = [];

if (process.env.NODE_ENV === 'development') {
    origins.push("https://dev.sell-ify.co.in")
    origins.push("https://www.dev.sell-ify.co.in")
}
else if (process.env.NODE_ENV === 'production') {
    origins.push("https://www.sell-ify.co.in")
}else{
    origins = '*'
}
    
if (process.env.WEB_URL && Array.isArray(origins)) {
    origins.push(process.env.WEB_URL)
}

module.exports = origins