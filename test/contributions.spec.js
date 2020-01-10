const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Contributions Endpoints', function () {
    let db

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('cleanup', () => helpers.cleanTables(db))

    afterEach('cleanup', () => helpers.cleanTables(db))

    describe('GET /contributions', () => {
        context('Given there are contributions', () => {
            const testCont = helpers.makeContributionsArray()
            const testUsers = helpers.makeUsersArray()
            const testRecipes = helpers.makeRecipes()
            const validUser = testUsers[0]

            beforeEach(
                async () => {
                await db.into('recipe').insert(testRecipes)
                await db.into('users').insert(testUsers)
                await db.into('contribution').insert(testCont)
            })

            it('gets all contributions', () => {
                return supertest(app)
                    .get('/api/contributions')
                    .set('Authorization', helpers.makeAuthHeader(validUser))
                    .expect(200, testCont)
            })
        })
    })

    describe('POST contributions', () => {
        const testUsers = helpers.makeUsersArray()
        const validUser = testUsers[0]
        
        const newCont = {
            contribution_name: 'test name',
            ingredient_id: 1,
            recipe_id: 1
        }

        return supertest(app)
            .post('/api/contributions')
            .set('Authorization', helpers.makeAuthHeader(validUser))
            .send(newCont)
            .expect(201)
            .expect(res => {
                expect(res.body).to.have.property('id')
                expect(res.body.contribution_name).to.eql(newCont.contribution_name)
                expect(res.body.ingredient_id).to.eql(newCont.ingredient_id)
                expect(res.body.recipe_id).to.eql(newCont.recipe_id)
            })
            .then(res => {
                supertest(app)
                    .get(`api/contributions/${res.body.id}`)
                    .set('Authorization', helpers.makeAuthHeader(validUser))
                    .expect(res.body)
            })
    })

    describe('GET /contributions by id', () => {
        context('Given there are contributions', () => {
            const testRecipes = helpers.makeRecipes()
            const testCont = helpers.makeContributionsArray()
            const testUsers = helpers.makeUsersArray()
            const validUser = testUsers[0]

            beforeEach(
                async () => {
                await db.into('recipe').insert(testRecipes)
                await db.into('users').insert(testUsers)
                await db.into('contribution').insert(testCont)
            })

            it('gets contributions by user', () => {
                return supertest(app)
                    .get(`/api/contributions/${validUser.id}`)
                    .set('Authorization', helpers.makeAuthHeader(validUser))
                    .expect(200)
            })

        })
    })

    describe('DELETE /contribution by id', () => {
        const testRecipes = helpers.makeRecipes()
        const testCont = helpers.makeContributionsArray()
        const testUsers = helpers.makeUsersArray()
        const validUser = testUsers[0]

        beforeEach(
            async () => {
            await db.into('recipe').insert(testRecipes)
            await db.into('users').insert(testUsers)
            await db.into('contribution').insert(testCont)
        })
   
        it('removes contribution by ID from the store', () => {
            const idToRemove = 2
            const expectedContributions = testCont.filter(cont => cont.id !== idToRemove)
            return supertest(app)
              .delete(`/api/contributions/${idToRemove}`)
              .set('Authorization', helpers.makeAuthHeader(validUser))
              .expect(204)
              .then(() =>
                supertest(app)
                  .get(`/api/contributions`)
                  .set('Authorization', helpers.makeAuthHeader(validUser))
                  .expect(expectedContributions)
              )
          })



    })
})