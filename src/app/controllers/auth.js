const User = require('../models/User')
const {
    checkUserExists,
    createNewUser,
    generateNewAccessToken,
    destroyCurrentToken,
    getAuthorizationToken,
    verifyRefreshToken,
} = require('../services/auth')
const {SLFYError} = require('../core/error')
const {SLFY_USER_EXISTS,SLFY_USER_NOT_EXISTS} = require('../core/constant').error.AUTH

const signIn = async (req) =>
    generateNewAccessToken(
        // eslint-disable-next-line no-underscore-dangle
        req.user._id,
        req.user.email,
        req.user.username
    )

const signUp = async (req) => {
    let user = await checkUserExists(req.body.email)

    if (user) {
        throw new SLFYError(SLFY_USER_EXISTS, "User already exists", 409)
    }

    user = await createNewUser(
        req.body.email,
        req.body.username || null,
        req.body.password
    )

    const newtoken = await generateNewAccessToken(
        user.id,
        user.email,
        user.username
    )
    return { user, newtoken }
}

const signOut = async (req) => {
    const token = getAuthorizationToken(req)
    await destroyCurrentToken(token)
    return 'Successfully logout!'
}

const getNewToken = async (req) => {
    const token = await verifyRefreshToken(req.body.token)
    const user = await User.findOne({ _id: token.userId })

    if (!user) {
        throw new SLFYError(SLFY_USER_NOT_EXISTS,'User not exists', 409)
    }

    // eslint-disable-next-line no-underscore-dangle
    return generateNewAccessToken(user._id, user.email, user.username)
}

module.exports = { signIn, signUp, signOut, getNewToken }
