const express = require('express')
const ContributionsServices = require('./contributions-services')
const path = require('path')
const requireAuth = require('../middleware/jwt-auth')


const contributionsRouter = express.Router()
const jsonBodyParser = express.json()

contributionsRouter
    .route('/')
    .all(requireAuth)
    .get((req, res, next) => {
        ContributionsServices.getAllContributions(req.app.get('db'))
            .then(cont => {
                res.json(cont)
            })
            .catch(next)
    })
    .post(jsonBodyParser, (req, res, next) => {
        const { contribution_name, ingredient_id, recipe_id } = req.body
        const user_id = req.user.id

        if (!contribution_name) {
            return res.status(400).json({
                error: 'Contribution name must be provided'
            })
        }
        const newContribution = { contribution_name, ingredient_id, recipe_id, user_id }
        const sanitizedContribution = ContributionsServices.sanitizeContribution(newContribution)


        ContributionsServices.contributeToRecipe(req.app.get('db'), sanitizedContribution)
            .then(cont => {
                res.status(201)
                    .location(path.posix.join(req.originalUrl, `/${cont.id}`))
                    .json(cont)
            })
            .catch(next)
    })

contributionsRouter
    .route('/:id')
    .get((req, res, next) => {
        ContributionsServices.getContributionsByUser(req.app.get('db'), req.params.id)
            .then(cont => {
                if (cont.length === 0) {
                    return res.status(404).json({
                        error: 'No user found'
                    })
                }
                res.send(cont)
            })
            .catch(next)
    })
    .delete((req, res, next) => {
        ContributionsServices.deleteContribution(req.app.get('db'), req.params.id)
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })




module.exports = contributionsRouter