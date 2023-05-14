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
            description: Joi.string(),
            tags: Joi.array().items(Joi.string()),
            sellType: Joi.string().valid('range', 'auction').required(),
            minPrice: Joi.alternatives().conditional('sellType', {
                is: 'range',
                then: Joi.number().min(0).required(),
                otherwise: Joi.forbidden(),
            }),
            maxPrice: Joi.number().min(100).required(),
        }
    }
}

module.exports = ItemCreateValidator
