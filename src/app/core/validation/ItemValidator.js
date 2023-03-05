const Joi = require('joi')
const Validator = require('./Validator')

class ItemCreateValidator extends Validator {
    // eslint-disable-next-line class-methods-use-this
    getOptions() {
        return {}
    }

    // eslint-disable-next-line class-methods-use-this
    getRules() {
        return {
            title: Joi.string().required(),
            shortDescription: Joi.string().required(),
            description: Joi.string().required(),
            tags: Joi.string().required(),
            sellType: Joi.string().valid('range', 'auction').required(),
            minPrice: Joi.number().min(0).required(),
            maxPrice: Joi.number().required(),
        }
    }
}

module.exports = ItemCreateValidator
