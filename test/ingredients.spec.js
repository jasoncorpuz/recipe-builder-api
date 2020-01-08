const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Ingredients Endpoints', function() {

    before('make knex instance', () => {
        db = knex ({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        })
        app.set('db', db)
    })
    
    after('disconnet from db', () => db.destroy())

    before('cleanup', () => helpers.cleanTables(db))

    afterEach('cleanup', () => helpers.cleanTables(db))

    describe('GET /ingredients', () => {
        context('Given there are ingredients', () => {
            const testIngredients = helpers.makeIngredients()
            
            it('gets all ingredients', () => {
                return supertest(app)
                 .get('/api/ingredients')
                 .expect(200, testIngredients)
            })
        })
    })

    describe('GET /ingredients/:id', () => {
        const testIngredients = helpers.makeIngredients()
        const ingredientId = 1

        const expectedIngredient = [testIngredients[0]]

        it('gets contribution by id', () => {
            return supertest(app)
             .get(`/api/ingredients/${ingredientId}`)
             .expect(200, expectedIngredient)
        })
    })
})