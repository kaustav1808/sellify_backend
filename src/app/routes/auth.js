const express = require('express')
const Validate = require('../core/validation')
const AuthValidator = require('../core/validation/AuthValidator')

const router = express.Router()
const passport = require('../utils/passport')
const UserController = require('../controllers/auth')

router.post(
    '/signin',
    (req, _, next) => Validate(new AuthValidator(), req, next),
    passport.authenticate('signin', { session: false }),
    (req, res, done) => {
        /* 	#swagger.tags = ['Authentication']
        #swagger.description = 'Log in user.' 
        #swagger.requestBody = {
            required: true,
            "@content": {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            email: {
                                type: "string"
                            },
                            password: {
                                type: "string"
                            }
                        },
                        required: ["email", "password"]
                    }
                }
            } 
        } */
        /*
        #swagger.responses[200] = {
                description: 'Logged in',
                schema: {
                    $accesstoken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2Q2NGQ1ZGQ1YTU0YjEwNjgzOTVkYzMiLCJlbWFpbCI6ImFiYy54eXpAZXhhbXBsZS5jb20iLCJ1c2VybmFtZSI6ImFiYy54eXpAZXhhbXBsZS5jb20iLCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNjgyOTI1ODgzfQ.qExVv64dWOpVjo9zfW5lBY7NSLNr1kp9rzDmQG70QdU',
                    $refreshtoken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2Q2NGQ1ZGQ1YTU0YjEwNjgzOTVkYzMiLCJlbWFpbCI6ImFiYy54eXpAZXhhbXBsZS5jb20iLCJ1c2VybmFtZSI6ImFiYy54eXpAZXhhbXBsZS5jb20iLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTY4MjkyNTg4M30.iJOfQn_jr5ziSm4vCORTFgUhTl706aCQ6pTYdWe41O4',
                    $expiretime: '2023-05-02T07:24:43.054Z'
                }        
        }
        #swagger.responses[401] = {
                description: 'Fail to login',
                schema: {
                    $status: 401,
                    $code: 'SLFY_PASSWORD_NOT_MATCHED',
                    $message$: 'Password not matched'
                }        
        }
        #swagger.responses[401] = {
                description: 'Fail to login',
                schema: {
                    $status: 401,
                    $code: 'SLFY_USER_NOT_FOUND',
                    $message$: 'User not found.'
                }        
        }
        */
        UserController.signIn(req)
            .then((data) => res.status(200).json(data))
            .catch((err) => done(err, null))
    }
)

router.post(
    '/signup',
    (req, _, next) => Validate(new AuthValidator(), req, next),
    (req, res, done) => {
        /* 	#swagger.tags = ['Authentication']
        #swagger.description = 'Register a new user in sellify user pool.'
        #swagger.requestBody = {
            required: true,
            "@content": {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            email: {
                                type: "string"
                            },
                            password: {
                                type: "string"
                            }
                        },
                        required: ["email", "password"]
                    }
                }
            } 
        }
        */
        /*
        #swagger.responses[201] = {
                description: 'Success',
                schema: {
                    "user": {
                        "id": '644f659227d9ac646446b2ac',
                        "email": 'abc.xwyz@example.com',
                        "username": 'abc.xwyz@example.com'
                    },
                    "newtoken": {
                        "accesstoken": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDRmNjU5MjI3ZDlhYzY0NjQ0NmIyYWMiLCJlbWFpbCI6ImFiYy54d3l6QGV4YW1wbGUuY29tIiwidXNlcm5hbWUiOiJhYmMueHd5ekBleGFtcGxlLmNvbSIsInR5cGUiOiJhY2Nlc3MiLCJpYXQiOjE2ODI5MjQ5NDZ9.Sm_8FNEWCXHaLV2MJUhstXo_IeAm9YU1oAkYfwgs0CM',
                        "refreshtoken": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDRmNjU5MjI3ZDlhYzY0NjQ0NmIyYWMiLCJlbWFpbCI6ImFiYy54d3l6QGV4YW1wbGUuY29tIiwidXNlcm5hbWUiOiJhYmMueHd5ekBleGFtcGxlLmNvbSIsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNjgyOTI0OTQ2fQ.6FAjzzSd5t4aEUxeaw-dlD1ZQ2Z_UT86XKi0v1lBw_g',
                        "expiretime": '2023-05-02T07:09:06.427Z'
                    }
                }        
        }
        #swagger.responses[409] = {
                description: 'Failed',
                schema: {
                    $status: 409,
                    $code: 'SLFY_USER_EXISTS',
                    $message: 'User already exists'
                }        
        }
        */
        UserController.signUp(req)
            .then((data) => res.status(201).json(data))
            .catch((err) => done(err, null))
    }
)

router.get(
    '/signout',
    passport.authenticate('verify_token', { session: false }),
    (req, res, done) => {
        /* 	#swagger.tags = ['Authentication']
        #swagger.description = 'Sign out current user.' 
        #swagger.security = [{
               'bearer': []
        }] */
        /*
        #swagger.responses[200] = {
                description: 'success',
                schema: 'Successfully logout!'        
        }
        #swagger.responses[401] = {
                description: 'Failed',
                schema: 'Unauthorized'      
        }
        */
        UserController.signOut(req)
            .then((data) => res.status(200).json(data))
            .catch((err) => done(err, null))
    }
)

router.post('/new-token', (req, res, done) => {
    /* 	#swagger.tags = ['Authentication']
        #swagger.description = 'Generate a new access token.'
        #swagger.requestBody = {
            required: true,
            "@content": {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            token: {
                                type: "string",
                                description: "refresh token"
                            },
                        },
                        required: ["token"]
                    }
                }
            } 
        }
        */
    /*
        #swagger.responses[201] = {
                description: 'Success',
                schema:  {
                    "accesstoken": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDRmNjU5MjI3ZDlhYzY0NjQ0NmIyYWMiLCJlbWFpbCI6ImFiYy54d3l6QGV4YW1wbGUuY29tIiwidXNlcm5hbWUiOiJhYmMueHd5ekBleGFtcGxlLmNvbSIsInR5cGUiOiJhY2Nlc3MiLCJpYXQiOjE2ODI5MjQ5NDZ9.Sm_8FNEWCXHaLV2MJUhstXo_IeAm9YU1oAkYfwgs0CM',
                    "refreshtoken": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDRmNjU5MjI3ZDlhYzY0NjQ0NmIyYWMiLCJlbWFpbCI6ImFiYy54d3l6QGV4YW1wbGUuY29tIiwidXNlcm5hbWUiOiJhYmMueHd5ekBleGFtcGxlLmNvbSIsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNjgyOTI0OTQ2fQ.6FAjzzSd5t4aEUxeaw-dlD1ZQ2Z_UT86XKi0v1lBw_g',
                    "expiretime": '2023-05-02T07:09:06.427Z'
                }        
        }
        #swagger.responses[409] = {
                description: 'Failed',
                schema: {
                    
                        "status": 409,
                        "code": "SLFY_INVALID_TOKEN",
                        "message": "Invalid token"
                }     
        }
        #swagger.responses[401] = {
                description: 'Failed',
                schema: {
                    $status: 401,
                    $code: 'SLFY_USER_NOT_EXISTS',
                    $message: 'User not exists'
                }        
        }
        */
    UserController.getNewToken(req, done)
        .then((data) => res.status(201).json(data))
        .catch((err) => done(err, null))
})

module.exports = router
