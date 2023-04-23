const express = require('express')

const router = express.Router()
const passport = require('../utils/passport')

const userRouter = require('./user')
const authRouter = require('./auth')
const auctionRouter = require('./auction')
const itemRouter = require('./item')

router.get('/', (req, res) => {
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

/**
 * @swagger
 * components:
 *   schemas:
 *     Items:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - short description
 *         - tags
 *         - sellType
 *         - status
 *         - minPrice
 *         - maxPrice
 *         - created_at
 *         - updated_at
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the item
 *         title:
 *           type: string
 *           description: The title of the item
 *         description:
 *           type: string
 *           description: description of the item
 *         shortDescription:
 *           type: boolean
 *           description: short description of the item
 *         tags:
 *           type: array
 *           description: array of tags of the item
 *         sellType:
 *           type: string
 *           description: selling type of the item ('auction', 'range')
 *         status:
 *           type: string
 *           description: selling status of the item ('open', 'closed', 'setteled')
 *         minPrice:
 *           type: Number
 *           description: minimum price of the item
 *         maxPrice:
 *           type: Number
 *           description: maximum price of the item
 *         created_at:
 *           type: string
 *           format: date
 *           description: The created date of the item
 *         updated_at:
 *           type: string
 *           format: date
 *           description: The created date of the item 
 *       example:
 *         id: 64172e50a682d4124f35146e
 *         title: The Tile
 *         description: descriptiion
 *         shortDescription: short description
 *         created_at: 2023-03-19T15:46:24.034+00:00
 *         updated_at: 2023-03-19T15:46:24.034+00:00
 */
router.use('/items', itemRouter)

module.exports = router
