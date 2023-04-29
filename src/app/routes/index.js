const express = require('express')

const router = express.Router()
const passport = require('../utils/passport')

const userRouter = require('./user')
const authRouter = require('./auth')
const auctionRouter = require('./auction')
const itemRouter = require('./item')

router.get('/', (req, res) => {
    /* 	#swagger.tags = ['baseurl']
        #swagger.description = 'Swagger api specification for sellify' */
    res.status(200).send('success')
})

router.use('/auth', authRouter)
router.use(
    '/users',
    passport.authenticate('verify_token', { session: false }),
    userRouter
)
router.use(
    '/auction',
    passport.authenticate('verify_token', { session: false }),
    auctionRouter
)

router.use('/items', itemRouter)

module.exports = router
