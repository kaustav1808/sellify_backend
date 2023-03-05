const express = require('express')
const passport = require('../utils/passport')
const ItemController = require('../controllers/item')
const Validate = require('../core/validation')
const ItemCreateValidator = require('../core/validation/ItemValidator')

const router = express.Router()

router.get('/', (req, res, done) => {
    ItemController.itemList()
        .then((result) => res.status(200).json(result))
        .catch((err) => done(err, null))
})

router.post(
    '/',
    passport.authenticate('verify_token', { session: false }),
    (req, _, next) => Validate(new ItemCreateValidator(), req, next),
    (req, res, done) => {
        ItemController.createItem(req)
            .then((result) => res.status(200).json(result))
            .catch((err) => done(err, null))
    }
)

module.exports = router
