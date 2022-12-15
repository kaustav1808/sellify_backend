const Validate = (validator, req, next) => {
    try {
        validator.run(req)
        next(null, true)
    } catch (e) {
        next(e, null)
    }
}
module.exports = Validate
