const errors = {
    USER_EXISTS: {
        status: 400,
        code: 'USER_EXISTS',
        message: 'user already exists.',
    },
}

// eslint-disable-next-line consistent-return
const getError = (key) => {
    if (key in errors) {
        return errors[key]
    }

    return {
        status: 500,
        code: 'INTERNAL_SERVER_ERROR',
        message: 'internal server error.',
    }
}

module.exports = getError
