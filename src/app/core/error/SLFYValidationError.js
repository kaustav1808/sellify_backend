const { SLFY_VALIDATION_ERROR } = require('../constant').error.VALIDATION
const SLFYError = require('./SLFYError')

class SLFYValidationError extends SLFYError {
    constructor(message, errors) {
        super(SLFY_VALIDATION_ERROR, message || 'Validation Error.', 402)
        this.errors = errors
    }

    getError() {
        return {
            status: this.errorStatus,
            code: this.code,
            message: this.message,
            errors: this.errors,
        }
    }
}

module.exports = SLFYValidationError
