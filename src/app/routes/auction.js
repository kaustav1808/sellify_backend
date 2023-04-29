const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    /* 	#swagger.tags = ['Auction']
        #swagger.description = 'Get all acution' */
    res.status(200).send('inside auction')
})

module.exports = router
