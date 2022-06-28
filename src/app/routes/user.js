const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    const {user} = req
    res.status(200).json({
        id: user._id,
        username: user.username,
        email: user.email,
    })
})

module.exports = router
