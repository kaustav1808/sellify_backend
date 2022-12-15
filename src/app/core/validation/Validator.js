const Joi = require('joi')
const { isEmpty } = require('../../utils/helpers')
const { SLFYError, SLFYValidationError } = require('../error')
const { SLFY_NO_RULE_DEFINED } = require('../constant').error.VALIDATION

class Validator {
    constructor() {
        this.rules = this.getRules()
        this.params = {}
        this.errors = null
        this.options = { abortEarly: false, ...this.getOptions() }
        this.schema = Joi.object(this.rules)
    }

    // eslint-disable-next-line class-methods-use-this
    getRules() {
        return {}
    }

    // eslint-disable-next-line class-methods-use-this
    getOptions() {
        return {}
    }

    validate() {
        if (isEmpty(this.rules)) {
            throw new SLFYError(
                SLFY_NO_RULE_DEFINED,
                'No rule defined for running the validation.'
            )
        }

        const { error } = this.schema.validate(this.params, this.options)

        if (error) {
            this.errors = error.details.map((err) => ({
                key: err.path[0],
                message: err.message,
            }))
            return false
        }

        return true
    }

    run(req) {
        this.params = req.body
        if (this.validate()) return true
        throw new SLFYValidationError(null, this.errors)
    }
}

module.exports = Validator
