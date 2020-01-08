require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const ingredientsRouter = require('./ingredients/ingredients-router')
const recipesRouter = require('./recipes/recipes-router.js')
const contributionsRouter = require('./contributions/contributions-router')
const authRouter = require('./auth/auth-router')
const userRouter = require('./users/users-router')
const jwt = require('jsonwebtoken')


const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(cors())
app.use(helmet())

app.use('/api/users', userRouter)
app.use('/api/recipes', recipesRouter)
app.use('/api/ingredients', ingredientsRouter )
app.use('/api/contributions', contributionsRouter)
app.use('/api/auth', authRouter)

app.get('/', (req, res, next) => {
  res.send('hello world')
})


  app.use(function errorHandler(error, req, res, next) {
      let response
      if (NODE_ENV === 'production') {
        response = { error: { message: 'server error' } }
      } else {
        console.error(error)
        response = { message: error.message, error }
      }
      res.status(500).json(response)
    })

module.exports = app