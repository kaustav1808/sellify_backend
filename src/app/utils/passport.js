const passport = require('passport')
const LocalStrategy = require('passport-local')
const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')
const User = require('../models/User')
const {
    SLFY_USER_NOT_FOUND,
    SLFY_PASSWORD_NOT_MATCHED,
    SLFY_UNAUTHORIZED_ACCESS,
    SLFY_TOKEN_EXPIRED,
} = require('../core/constant').error.AUTH
const {
    checkIfTokenExpire,
    getAuthorizationToken,
    destroyCurrentToken,
} = require('../services/auth')

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.JWT_SECRET
opts.passReqToCallback = true

passport.use(
    'signin',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        async (email, password, done) => {
            let user
            try {
                user = await User.findOne({ email })
            } catch (e) {
                done(e)
            }

            if (!user) {
                return done(
                    {
                        status: 401,
                        message: 'User not found.',
                        code: SLFY_USER_NOT_FOUND,
                    },
                    false
                )
            }

            if (!user.verifyPassword(password)) {
                return done(
                    {
                        status: 401,
                        message: 'Password not matched',
                        code: SLFY_PASSWORD_NOT_MATCHED,
                    },
                    false
                )
            }

            return done(null, user)
        }
    )
)

passport.use(
    'verify_token',
    new JwtStrategy(opts, async (req, jwtPayload, done) => {
        const user = await User.findOne({ _id: jwtPayload.userId })

        if (!user) {
            return done({
                status: 401,
                message: 'Unauthorize access',
                code: SLFY_UNAUTHORIZED_ACCESS,
            })
        }

        try {
            const token = getAuthorizationToken(req)
            const checkTokenExpiration = await checkIfTokenExpire(token)
            if (checkTokenExpiration) {
                await destroyCurrentToken(token)
                return done({
                    status: 401,
                    message: 'Token expired',
                    code: SLFY_TOKEN_EXPIRED,
                })
            }
        } catch (err) {
            done(err, null)
        }

        return done(null, user)
    })
)

module.exports = passport
