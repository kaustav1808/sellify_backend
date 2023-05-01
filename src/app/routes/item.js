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
    /*
    #swagger.responses[200] = {
            description: 'Item lists',
            schema: {'$ref': '#/definitions/ItemList'}        
    }
    */

    ItemController.itemList()
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
        ItemController.createItem(req)
            .then((result) => res.status(200).json(result))
            .catch((err) => done(err, null))
    }
)

router.put(
    '/',
    passport.authenticate('verify_token', { session: false }),
    (req, res, done) => {
        ItemController.updateItem(req)
            .then((result) => res.status(200).json(result))
            .catch((err) => done(err, null))
    }
)

router.get(
    '/set-archive/:id',
    passport.authenticate('verify_token', { session: false }),
    (req, res, done) => {
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
