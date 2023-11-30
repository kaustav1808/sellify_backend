const express = require('express')
const passport = require('../utils/passport')
const ItemController = require('../controllers/item')
const Validate = require('../core/validation')
const ItemCreateValidator = require('../core/validation/ItemValidator')

const router = express.Router()

router.get('/', (req, res, done) => {
    /* 	#swagger.tags = ['Items']
        #swagger.description = 'get list of tiems.'
    */
    /* #swagger.parameters['type'] = {
        in: 'query',                            
        description: 'Current item with status "OPEN", "SETTLED", "CLOSED"'                     
        type: 'string',                  
        schema: <array>, <object> or <string>    
    } */
    /*
    #swagger.responses[200] = {
            description: 'Item lists',
            schema: {'$ref': '#/definitions/ItemList'}        
    }
    */

    ItemController.itemList(req.query)
        .then((result) => res.status(200).json(result))
        .catch((err) => done(err, null))
})

router.get('/:id', (req, res, done) => {
    /* 	#swagger.tags = ['Items']
        #swagger.description = 'get item.'
    */
    /*
    #swagger.responses[200] = {
            description: 'Item lists',
            schema: {'$ref': '#/definitions/Item'}        
    }
    */
    ItemController.findItemById(req)
        .then((result) => res.status(200).json(result))
        .catch((err) => done(err, null))
})

router.post(
    '/',
    passport.authenticate('verify_token', { session: false }),
    (req, _, next) => Validate(new ItemCreateValidator(), req, next),
    (req, res, done) => {
        /* 	#swagger.tags = ['Items']
            #swagger.description = 'Create a new item.'
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
                                title: { type: "string" },
                                shortDescription: { type: "string" },
                                description: { type: "string" },
                                tags: { type: "array", items: {type: "string"} },
                                sellType: { type: "string", items: ['range', 'auction'] },
                                minPrice: { type: "number" },
                                maxPrice: { type: "number" },
                            },    
                            required: ["title", "shortDescription", "description", "sellType", "maxPrice"]
                        }
                    }
                } 
            }
        */
        /*
            #swagger.responses[201] = {
                    description: 'Success',
                    schema: {'$ref': '#/definitions/ShortItem'}        
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
        ItemController.createItem(req)
            .then((result) => res.status(201).json(result))
            .catch((err) => done(err, null))
    }
)

router.put(
    '/:id',
    passport.authenticate('verify_token', { session: false }),
    (req, res, done) => {
        /* 	#swagger.tags = ['Items']
            #swagger.description = 'Update an new item.'
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
                                id: { type: "string" },
                                title: { type: "string" },
                                shortDescription: { type: "string" },
                                description: { type: "string" },
                                tags: { type: "array", items: {type: "string"} },
                                minPrice: { type: "number" },
                                maxPrice: { type: "number" },
                            },    
                            required: ["title", "shortDescription", "description", "sellType", "maxPrice"]
                        }
                    }
                } 
            }
        */
        /*
            #swagger.responses[200] = {
                    description: 'Success',
                    schema: {'$ref': '#/definitions/ShortItem'}        
            }
            #swagger.responses[403] = {
                    description: 'Failed',
                    schema: 
                        {
                            $status: 403,
                            $code: 'SLFY_ACCESSING_INVALID_ITEM',
                            $message: 'Updating an unauthorized item.',
                        }, 
            }
        */
        ItemController.updateItem(req)
            .then((result) => res.status(200).json(result))
            .catch((err) => done(err, null))
    }
)

router.get(
    '/set-archive/:id',
    passport.authenticate('verify_token', { session: false }),
    (req, res, done) => {
        /* 	#swagger.tags = ['Items']
        #swagger.description = 'set item to archive.'
        #swagger.security = [{
               'bearer': []
        }]
    */
        /*
    #swagger.responses[200] = {
            description: 'Archived item',
            schema: {'$ref': '#/definitions/ShortItem'}        
    }
    #swagger.responses[403] = {
            description: 'Updating an unauthorized item.',
            schema: {
                    $status: 403,
                    $code: 'SLFY_ACCESSING_INVALID_ITEM',
                    $message$: 'Updating an unauthorized item.'
                }        
    }
    #swagger.responses[401] = {
            description: 'Unauthorized.',
            schema: 'Unauthorized'        
    }
    */
        ItemController.setItemToArchive(req)
            .then((result) => res.status(200).json(result))
            .catch((err) => done(err, null))
    }
)

router.delete(
    '/:id',
    passport.authenticate('verify_token', { session: false }),
    (req, res, done) => {
        /* 	#swagger.tags = ['Items']
        #swagger.description = 'delete item.'
        #swagger.security = [{
               'bearer': []
        }]
    */
        /*
    #swagger.responses[200] = {
            description: 'delete item',
            schema: true        
    }
    #swagger.responses[401] = {
                description: 'Failed',
                schema: 'Unauthorized'      
        }
    */
        ItemController.deleteItem(req)
            .then((result) => res.status(200).json(result))
            .catch((err) => done(err, null))
    }
)

module.exports = router
