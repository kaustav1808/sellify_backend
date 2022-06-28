const passport = require('passport')
const LocalStrategy = require('passport-local')
const JwtStrategy = require('passport-jwt').Strategy
const {ExtractJwt} = require('passport-jwt')
const User = require('../models/User')
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
                return done({ status: 400, message: 'user not found' }, false)
            }

            if (!user.verifyPassword(password)) {
                return done(
                    { status: 400, message: 'password not matched' },
                    false
                )
            }

            return done(null, user)
        }
    )
)

passport.use(
    'verify_token',
    new JwtStrategy(opts, (async (req, jwt_payload, done) => {
        const user = await User.findOne({ _id: jwt_payload.userId })

        if (!user) {
            return done({ status: 400, message: 'Unauthorize access' })
        }

        try {
            const token = getAuthorizationToken(req)
            const checkTokenExpiration = await checkIfTokenExpire(token)
            if (checkTokenExpiration) {
                await destroyCurrentToken(token)
                return done({ status: 400, message: 'token expired' })
            }
        } catch (err) {
            console.log(err)
            done(err, null)
        }

        return done(null, user)
    }))
)

module.exports = passport
