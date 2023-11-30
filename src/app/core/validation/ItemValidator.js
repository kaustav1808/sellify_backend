const Joi = require('joi')
const Validator = require('./Validator')
const { RANGE, AUCTION } = require('../../constants/ItemStatus')

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
            sellType: Joi.string().valid(RANGE, AUCTION).required(),
            minPrice: Joi.alternatives().conditional('sellType', {
                is: RANGE,
                then: Joi.number().min(0).required(),
                otherwise: Joi.forbidden(),
            }),
            maxPrice: Joi.number().min(100).required(),
            priceOffset: Joi.alternatives().conditional('sellType', {
                is: AUCTION,
                then: Joi.number().min(0).required(),
                otherwise: Joi.forbidden(),
            }),
        }
    }
}

module.exports = ItemCreateValidator
