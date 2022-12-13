const { error } = require('../constant')

class SLFYError extends Error {
    constructor(code, message, status) {
        super(message)
        this.errorStatus = status || 500
        this.code = code || error.SLFY_ERROR
        this.message = message || error.SLFY_ERROR
    }

    getCode() {
        return this.code
    }

    getStatus() {
        return this.errorStatus
    }

    getMessage() {
        return this.message()
    }

    getError() {
        return {
            status: this.errorStatus,
            code: this.code,
            message: this.message,
        }
    }
}

module.exports = SLFYError
