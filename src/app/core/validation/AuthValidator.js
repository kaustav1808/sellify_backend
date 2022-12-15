const Joi = require('joi')
const Validator = require('./Validator')

class AuthValidator extends Validator {
    // eslint-disable-next-line class-methods-use-this
    getOptions() {
        return {}
    }

    // eslint-disable-next-line class-methods-use-this
    getRules() {
        return {
            email: Joi.string().required(),
            password: Joi.string().required(),
        }
    }
}

module.exports = AuthValidator
