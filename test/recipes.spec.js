const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Recipes Endpoints', function () {
    let db

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        })
        app.set('db', db)
    })

    after('disconnet from db', () => db.destroy())

    before('cleanup', () => helpers.cleanTables(db))

    afterEach('cleanup', () => helpers.cleanTables(db))

    describe('GET /recipes', () => {
        context('Given there are recipes', () => {
            const testRecipes = helpers.makeRecipes()
            const testUsers = helpers.makeUsersArray()
            const validUser = testUsers[0]

            beforeEach('insert recipes', () => {
                return db
                    .into('recipe')
                    .insert(testRecipes)
            })

            it('gets all recipes', () => {
                return supertest(app)
                    .get('/api/recipes')
                    .expect(200, testRecipes)
            })
        })
    })

    describe('POST /recipes', () => {
        const newRecipe = {
            recipe_name: 'test recipe',
            completed: false
        }

        it('posts new recipe', () => {
            return supertest(app)
                .post('/api/recipes')
                .send(newRecipe)
                .expect(201)
                .expect(res => {
                    expect(res.body).to.have.property('id')
                    expect(res.body.recipe_name).to.eql(newRecipe.recipe_name)
                    expect(res.body.completed).to.eql(false)
                })
                .then(res => {
                    supertest(app)
                        .get(`api/recipes/${res.body.id}`)
                        .expect(res.body)
                })
        })
    })

    describe('GET /recipes/:recipe_id', () => {
        context('given there are recipes', () => {
            const testRecipes = helpers.makeRecipes()
            const testUsers = helpers.makeUsersArray()
            const recipeId = 1

            beforeEach('insert recipes', () => {
                return db
                    .into('recipe')
                    .insert(testRecipes)
            })
            const expectedRecipe =
                [{
                    ingredient: null,
                    ingredient_id: null,
                    contributor: null,
                    user_id: null,
                    recipe: 'Test Recipe 1',
                    recipe_id: 1,
                    id: null
                }]
            it('gets recipe by id', () => {
                return supertest(app)
                    .get(`/api/recipes/${recipeId}`)
                    .expect(200, expectedRecipe)
            })
        })
    })

    describe('PATCH /recipes/:recipe_id', () => {
        context('Given there are recipes', () => {
            const testRecipes = helpers.makeRecipes()
            const recipe_name = 'patching 1'
            const completed = true
            const recipeId = 1
            const patchedRecipe = { recipe_name, completed }

            beforeEach('insert recipes', () => {
                return db
                    .into('recipe')
                    .insert(testRecipes)
            })
            it('patches to true', () => {
                return supertest(app)
                    .patch(`/api/recipes/${recipeId}`)
                    .send(patchedRecipe)
                    .expect(204)
            })

        })
    })

    describe('GET recipes/user/:id', () => {
        context('Given there are recipes', () => {
            const testRecipes = helpers.makeRecipes()
            const recipe_name = 'patching 1'
            const completed = true
            const recipeId = 1
            const patchedRecipe = { recipe_name, completed }

            beforeEach('insert recipes', () => {
                return db
                    .into('recipe')
                    .insert(testRecipes)
            })
            it('patches to true', () => {
                return supertest(app)
                    .patch(`/api/recipes/${recipeId}`)
                    .send(patchedRecipe)
                    .expect(204)
            })

            it('Gets recipes by user', () => {
                const userId = 1
                return supertest(app)
                    .get(`/api/recipes/user/${userId}`)
                    .expect(200)
            })

        })


    })
})


