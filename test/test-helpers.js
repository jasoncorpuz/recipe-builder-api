const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function makeUsersArray() {
    // seed users
    return[
        {
            id: 1, 
            user_name:'test user 1',
            password:"Password.1"
        },
        {
            id: 2, 
            user_name:'test user 2',
            password:"Password.1"
        },
        {
            id: 3, 
            user_name:'test user 3',
            password:"Password.1"
        },
        {
            id: 4, 
            user_name:'test user 4',
            password:"Password.1"
        }
    ]
}

function makeContributionsArray(){
    return [
        {
            id: 1,
            contribution_name: 'contribution 1',
            recipe_id: 1, 
            user_id: 1,
            ingredient_id: 1
        },
        {
            id: 2,
            contribution_name: 'contribution 2',
            recipe_id: 1, 
            user_id: 2,
            ingredient_id: 2
        },
        {
            id: 3,
            contribution_name: 'contribution 3',
            recipe_id: 1, 
            user_id: 3,
            ingredient_id: 3
        },
        {
            id: 4,
            contribution_name: 'contribution 4',
            recipe_id: 1, 
            user_id: 4,
            ingredient_id: 4
        },
        {
            id: 5,
            contribution_name: 'contribution 5',
            recipe_id: 2, 
            user_id: 1,
            ingredient_id: 5
        },
        {
            id: 6,
            contribution_name: 'contribution 6',
            recipe_id: 2, 
            user_id: 2,
            ingredient_id: 6
        },
        {
            id: 7,
            contribution_name: 'contribution 7',
            recipe_id: 2, 
            user_id: 3,
            ingredient_id: 7
        },
        {
            id: 8,
            contribution_name: 'contribution 8',
            recipe_id: 2, 
            user_id: 4,
            ingredient_id: 5
        },
        {
            id: 9,
            contribution_name: 'contribution 9',
            recipe_id: 3, 
            user_id: 1,
            ingredient_id: 1
        },
        {
            id: 10,
            contribution_name: 'contribution 10',
            recipe_id: 3, 
            user_id: 2,
            ingredient_id: 2 
        },
    ]
}

function makeIngredients() {
    return [
        {
            id: 1, 
            ingredient_name: 'Apples'
        },
        {
            id: 2, 
            ingredient_name: 'Baking Powder'
        },
        {
            id: 3, 
            ingredient_name: 'Bread'
        },
        {
            id: 4, 
            ingredient_name: 'Butter'
        },
        {
            id: 5, 
            ingredient_name: 'Carrots'
        },
        {
            id: 6, 
            ingredient_name: 'Cheese'
        },
        {
            id: 7, 
            ingredient_name: 'Chicken Breast'
        },
    ]
}

function makeRecipes(){
    return [
        {
            id: 1,
            recipe_name: 'Test Recipe 1',
            completed: true 
        },
        {
            id: 2,
            recipe_name: 'Test Recipe 2',
            completed: true 
        },
        {
            id: 3,
            recipe_name: 'Test Recipe 3',
            completed: false 
        },
    ]
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
    const token = jwt.sign({ user_id: user.id }, secret, {
      subject: user.user_name,
      algorithm: 'HS256',
    })
    return `Bearer ${token}`
}

function cleanTables(db) {
    return db.transaction(trx =>
      trx.raw(
        `TRUNCATE
            contribution,
            recipe,
            users
        `
      )
      .then(() =>
        Promise.all([
          trx.raw(`ALTER SEQUENCE contribution_id_seq minvalue 0 START WITH 1`),
          trx.raw(`ALTER SEQUENCE recipe_id_seq minvalue 0 START WITH 1`),
          trx.raw(`ALTER SEQUENCE users_id_seq minvalue 0 START WITH 1`),
          trx.raw(`SELECT setval('contribution_id_seq', 0)`),
          trx.raw(`SELECT setval('recipe_id_seq', 0)`),
          trx.raw(`SELECT setval('users_id_seq', 0)`),
        ])
      )
    )
  }

  function seedUsers(db, users) {
    const preppedUsers = users.map(user => ({
      id: user.id,
      user_name: user.user_name,
      password: bcrypt.hashSync(user.password, 1)


    }))
    return db.into('users').insert(preppedUsers)
      .then(() =>
        // update the auto sequence to stay in sync
        db.raw(
          `SELECT setval('users_id_seq', ?)`,
          [users[users.length - 1].id],
        )
      )
  }
  
module.exports = {
    cleanTables,
    makeUsersArray,
    makeContributionsArray,
    makeIngredients,
    makeRecipes,
    makeAuthHeader,
    seedUsers
}