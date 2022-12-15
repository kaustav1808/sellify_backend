const Validate = (className, req, next) => {
    try{
        // eslint-disable-next-line no-eval
        const result = eval(`new (require("./${className}"))()`)
        result.run(req)
        next(null,true)
    }catch(e){
        next(e, null)
    }
}
module.exports = Validate