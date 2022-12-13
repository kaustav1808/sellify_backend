const jwt = require('jsonwebtoken')
const { SLFYError } = require('../core/error')
const User = require('../models/User')
const UserToken = require('../models/UserToken')
const { SLFY_CORRUPTED_TOKEN, SLFY_INVALID_TOKEN } =
    require('../core/constant').error.AUTH

const checkUserExists = async (email) => {
    const user = await User.findOne({ email }).exec()

    if (user) {
        // eslint-disable-next-line no-underscore-dangle
        return { id: user._id, email: user.email, username: user.username }
    }

    return false
}

const generateNewPassword = async (user, password) => {
    user.generateHash(password)
    await user.save()
}

const createNewUser = async (email, username = null, password = null) => {
    const payload = { email, username: username || email }
    const user = new User(payload)
    await user.save()

    if (password) {
        await generateNewPassword(user, password)
    }

    // eslint-disable-next-line no-underscore-dangle
    return { id: user._id, email: user.email, username: user.username }
}

const generateNewAccessToken = async (userId, email, username) => {
    const payload = { userId, email, username }

    const accesstoken = jwt.sign(
        { ...payload, type: 'access' },
        process.env.JWT_SECRET
    )
    const refreshtoken = jwt.sign(
        { ...payload, type: 'refresh' },
        process.env.JWT_SECRET
    )
    const expiretime = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()

    await UserToken.create({
        userId: payload.userId,
        accesstoken,
        refreshtoken,
        expiretime,
    })
    return { accesstoken, refreshtoken, expiretime }
}

const getAuthorizationToken = (req) => {
    const token = req.headers.authorization.split(' ')
    if (token.length !== 2) {
        throw new SLFYError(SLFY_CORRUPTED_TOKEN, 'Token corrupted.', 409)
    }
    return token[1]
}

const checkIfTokenExpire = async (token) => {
    const tokenExistance = await UserToken.findOne({ accesstoken: token })

    if (!tokenExistance) {
        return true
    }

    const timedifference = new Date(tokenExistance.expiretime) - new Date()
    if (timedifference <= 0) {
        return true
    }

    return false
}

const destroyCurrentToken = async (token) => {
    const dbExists = await UserToken.findOne({
        accesstoken: token,
    })

    return dbExists.deleteOne()
}

const verifyRefreshToken = async (token) => {
    const payload = jwt.verify(token, process.env.JWT_SECRET)

    const usrtoken = await UserToken.findOne({
        userId: payload.userId,
        refreshtoken: token,
    })
    if (!usrtoken) {
        throw new SLFYError(SLFY_INVALID_TOKEN, 'Invalid token', 409)
    }
    return usrtoken
}

module.exports = {
    checkUserExists,
    createNewUser,
    generateNewPassword,
    generateNewAccessToken,
    destroyCurrentToken,
    getAuthorizationToken,
    checkIfTokenExpire,
    verifyRefreshToken,
}
