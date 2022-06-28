const express = require('express')

const router = express.Router()
const passport = require('../utils/passport')

const userRouter = require('./user')
const authRouter = require('./auth')
const auctionRouter = require('./auction')

router.get('/', (req, res) => {
    res.status(200).send('success')
})

router.use('/auth', authRouter)
router.use(
    '/user',
    passport.authenticate('verify_token', { session: false }),
    userRouter
)
router.use(
    '/auction',
    passport.authenticate('verify_token', { session: false }),
    auctionRouter
)

module.exports = router
