const express = require('express')
const RecipesService = require('./recipes-services')
const path = require('path')

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
    .post(jsonBodyParser, (req, res, next) => {
        const { recipe_name , completed} = req.body
        const newRecipe = {recipe_name, completed}
        // if (!recipe_name) {
        //     return res.status(400).json({
        //         error: 'Name not provided'
        //     })
        // }

        RecipesService.generateRecipeName(req.app.get('db'), newRecipe)
            .then(r => {
                res.status(201)
                    .location(path.posix.join(req.originalUrl, `/${r.id}`))
                    .json(r)
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
                res.send(rec)
            })
            .catch(next)
    })
    .patch(jsonBodyParser,(req, res, next) => {
        const { recipe_name, completed } = req.body
        const updatedRecipe = { recipe_name, completed }
        console.log(req.params.id)
        RecipesService.updateRecipe(req.app.get('db'), req.params.recipe_id, updatedRecipe)
         .then(rec => {
             if(!rec) {
                 return res.status(404).send(`recipe not found`)
             }
         })
         .then(numRowsAffected => {
             res.status(204).end()
         })
         .catch(next)
    })

recipesRouter
 .route('/user/:id')
 .get((req,res,next) => {
    RecipesService.getRecipeByUser(req.app.get('db'), req.params.id)
     .then(rec => {
         if (!rec) {
             return res.status(404).send('user not found')
         }
        res.send(rec)    
     })
     
     .catch(next)
 })


module.exports = recipesRouter