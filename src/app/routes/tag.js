const express = require('express')
const passport = require('../utils/passport')
const tagController = require('../controllers/tag')

const router = express.Router()

router.get('/', (req, res, done) => {
    /* 	#swagger.tags = ['Tags']
        #swagger.description = 'get list of Tags.'
    */
    /*
    #swagger.responses[200] = {
            description: 'Item lists',
            schema: {'$ref': '#/definitions/tags'}        
    }
    */

    tagController
        .list(req.query)
        .then((result) => res.status(200).json(result))
        .catch((err) => done(err, null))
})

router.post(
    '/',
    passport.authenticate('verify_token', { session: false }),
    (req, res, done) => {
        /* 	#swagger.tags = ['Tags']
            #swagger.description = 'Create a new tag.'
            #swagger.security = [{
               'bearer': []
            }]
            #swagger.requestBody = {
                required: true,
                "@content": {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                tag: { type: "string" },
                            },    
                            required: ["tag"]
                        }
                    }
                } 
            }
        */
        /*
            #swagger.responses[201] = {
                    description: 'Success',
                    schema: {'$ref': '#/definitions/tag'}        
            }
            #swagger.responses[402] = {
                    description: 'Failed',
                    schema: {
                        $status: 402,
                        $code: 'SLFY_VALIDATION_ERROR',
                        $message: 'Validation Error.',
                        $errors: {},
                    }        
            }
        */
        tagController
            .create(req)
            .then((result) => res.status(201).json(result))
            .catch((err) => done(err, null))
    }
)

module.exports = router
