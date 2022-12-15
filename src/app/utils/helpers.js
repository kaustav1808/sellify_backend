const isEmpty = (obj) => obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype


module.exports = {isEmpty}