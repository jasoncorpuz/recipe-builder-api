const express = require('express')
const IngredientsService = require('./ingredients-services')

const ingredientsRouter = express.Router()
const jsonBodyParser = express.json()

ingredientsRouter
    .route('/')
    .get((req, res, next) => {
        IngredientsService.getAllIngredients(req.app.get('db'))
         .then(ing => {
             res.json(ing)
         })
         .catch(next)
    })

ingredientsRouter
    .route('/:ingredient_id')
    .get((req,res,next) => {
        IngredientsService.getIngredientById(req.app.get('db'), req.params.ingredient_id)
         .then(ing => {
             res.json(ing)
         })
         .catch(next)
    })

module.exports = ingredientsRouter