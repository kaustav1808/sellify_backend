const error = {
    SLFY_ERROR: 'SLFY_ERROR',
    SLFY_ERROR_404: 'SLFY_RESOURCE_NOT_FOUND',
    AUTH: {
        SLFY_USER_NOT_FOUND: 'SLFY_USER_NOT_FOUND',
        SLFY_USER_EXISTS: 'SLFY_USER_EXISTS',
        SLFY_USER_NOT_EXISTS: 'SLFY_USER_NOT_EXISTS',
        SLFY_PASSWORD_NOT_MATCHED: 'SLFY_PASSWORD_NOT_MATCHED',
        SLFY_UNAUTHORIZED_ACCESS: 'SLFY_UNAUTHORIZED_ACCESS',
        SLFY_TOKEN_EXPIRED: 'SLFY_TOKEN_EXPIRED',
        SLFY_CORRUPTED_TOKEN: 'SLFY_CORRUPTED_TOKEN',
        SLFY_INVALID_TOKEN: 'SLFY_INVALID_TOKEN',
    },
    VALIDATION: {
        SLFY_NO_RULE_DEFINED: 'SLFY_NO_RULE_DEFINED',
        SLFY_VALIDATION_ERROR: 'SLFY_VALIDATION_ERROR',
    },
    ITEM: {
        SLFY_ACCESSING_INVALID_ITEM: 'SLFY_ACCESSING_INVALID_ITEM',
    },
}

module.exports = { error }
