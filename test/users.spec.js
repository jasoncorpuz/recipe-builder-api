const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Users Endpoints', function () {
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

    describe('GET /', () => {
        const testUsers = helpers.makeUsersArray()
        const validUser = testUsers[0]

       context('given there are users', () => {
        const testUsers = helpers.makeUsersArray()

        beforeEach('insert users', () => {
            return db 
             .into('users')
             .insert(testUsers)
        })
        it('gets all users', () => {
            return supertest(app)
                .get('/api/users')
                .expect(200, testUsers)
        })

       })
    })

    describe('POST /', () => {
        const newUser = 'test user'
        const password = 'Password.1'
        const postedUser = { 
            user_name: newUser,
            password: password
        }

        it('posts user', () => {
            return supertest(app)
             .post('/api/users')
             .send(postedUser)
             .expect(201)
             .then(res => {
                 supertest(app)
                  .get(`api/users/${res.body.id}`)
                  .expect(res.body)
             })
        })
    })

    describe('GET /:id', () => {
        context('given there are users', () => {
            const testUsers = helpers.makeUsersArray()
            const userId = 1
            const testUser = [testUsers[userId - 1]]
            
    
            beforeEach('insert users', () => {
                return db 
                 .into('users')
                 .insert(testUsers)
            })

            it('gets user by id', () => {
                return supertest(app)
                 .get(`/api/users/${userId}`)
                 .expect(200, testUser)

            })
        })
    })
})