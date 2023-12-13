const express = require('express')

const router = express.Router()
const passport = require('../utils/passport')

const userRouter = require('./user')
const authRouter = require('./auth')
const auctionRouter = require('./auction')
const itemRouter = require('./item')
const tagRouter = require('./tag')

router.get('/', (req, res) => {
    /* 	#swagger.tags = ['Baseurl']
        #swagger.description = 'Swagger api specification for sellify'
    */

    /*
        #swagger.responses[200] = { description: 'Success', schema: 'Success' }
    */
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
router.use('/tags', tagRouter)

router.use('/items', itemRouter)

module.exports = router
