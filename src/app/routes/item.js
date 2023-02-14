const express = require('express')
const ItemController = require('../controllers/item')

const router = express.Router()

router.get('/', (req, res, done) => {
    ItemController.itemList()
        .then((result) => res.status(200).json(result))
        .catch((err) => done(err, null))
})

module.exports = router
