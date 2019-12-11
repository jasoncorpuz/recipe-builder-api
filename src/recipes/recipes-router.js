const express = require('express')
const RecipesService = require('./recipes-services')
const path = require('path')

const recipesRouter = express.Router()
const jsonBodyParser = express.json()

recipesRouter
    .route('/')
    .get((req,res,next ) => {
        RecipesService.getAllRecipes(req.app.get('db'))
         .then(recipes => {
             res.json(recipes)
         })
         .catch(next)
    })
    .post(jsonBodyParser, (req,res,next) => {
        const { contribution_name, ingredient_id, recipe_id, user_id } = req.body
        const newContribution = { contribution_name, ingredient_id, recipe_id, user_id }

       RecipesService.contributeToRecipe(req.app.get('db'), newContribution)
        .then(cont => {
            res.status(201)
             .location(path.posix.join(req.originalUrl, `/${cont.id}`))
             .json(cont)
        })
        .catch(next)
    })


recipesRouter
    .route('/:recipe_id')
    .get((req,res,next) => {
        RecipesService.getRecipeById(req.app.get('db'), req.params.recipe_id)
        .then(recipes => {
            res.json(recipes)
        })
        .catch(next)
    })


module.exports = recipesRouter