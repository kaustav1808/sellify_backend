const jwt = require('jsonwebtoken')
const User = require('../models/User')
const UserToken = require('../models/UserToken')

const checkUserExists = async (email) => {
    const user = await User.findOne({ email }).exec()

    if (user) {
        return { id: user._id, email: user.email, username: user.username }
    }

    return false
}

const createNewUser = async (email, username = null, password = null) => {
    const payload = { email, username: username || email }
    user = new User(payload)
    await user.save()

    if (password) {
        await generateNewPassword(user, password)
    }

    return { id: user._id, email: user.email, username: user.username }
}

const generateNewPassword = async (user, password) => {
    user.generateHash(password)
    await user.save()
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
        throw new Error('corrupted token')
    }
    return token[1]
}

const checkIfTokenExpire = async (token) => {
    const token_existance = await UserToken.findOne({ accesstoken: token })

    if (!token_existance) {
        return true
    }

    const timedifference = new Date(token_existance.expiretime) - new Date()
    if (timedifference <= 0) {
        return true
    }

    return false
}

const destroyCurrentToken = async (token) => {
    const db_exists = await UserToken.findOne({
        accesstoken: token,
    })

    return await db_exists.deleteOne()
}

const verifyRefreshToken = async (token) => {
    const payload = jwt.verify(token, process.env.JWT_SECRET)

    const usrtoken = await UserToken.findOne({
        userId: payload.userId,
        refreshtoken: token,
    })
    if (!usrtoken) {
        throw new Error('invalid token')
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
