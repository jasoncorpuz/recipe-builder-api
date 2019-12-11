const express = require('express')
const RecipesService = require('./recipes-services')

const recipesRouter = express.Router()
const jsonBodyParser = express.json()

recipesRouter
    .route('/')
    .get((req, res, next) => {
        RecipesService.getAllRecipes(req.app.get('db'))
            .then(recipes => {
                res.json(recipes)
            })
            .catch(next)
    })


recipesRouter
    .route('/:recipe_id')
    .get((req, res, next) => {
        RecipesService.getRecipeById(req.app.get('db'), req.params.recipe_id)
            .then(rec => {
                if (rec.length === 0) {
                    return res.status(404).json({
                        error: 'Recipe not found'
                    })
                }
            })
            .catch(next)
    })


module.exports = recipesRouter