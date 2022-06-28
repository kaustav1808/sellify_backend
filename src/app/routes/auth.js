const express = require('express')

const router = express.Router()
const passport = require('../utils/passport')
const UserController = require('../controllers/auth')

router.post(
    '/signin',
    passport.authenticate('signin', { session: false }),
    (req, res, done) => {
        UserController.signIn(req)
            .then((data) => res.status(200).json(data))
            .catch((err) => done(err, null))
    }
)

router.post('/signup', (req, res, done) => {
    UserController.signUp(req, done)
        .then((data) => res.status(201).json(data))
        .catch((err) => done(err, null))
})

router.get(
    '/signout',
    passport.authenticate('verify_token', { session: false }),
    (req, res, done) => {
        UserController.signOut(req)
            .then((data) => res.status(200).json(data))
            .catch((err) => done(err, null))
    }
)

router.post('/new-token', (req, res, done) => {
    UserController.getNewToken(req, done)
        .then((data) => res.status(201).json(data))
        .catch((err) => done(err, null))
})

module.exports = router
