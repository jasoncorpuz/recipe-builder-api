const xss = require('xss')

const IngredientsService = {
    getAllIngredients(db) {
        return db.select('*').from('ingredient')
    },
    getIngredientById(db, id) {
        return db
            .from('ingredient')
            .select('*')
            .where('ingredient.id', id)
    },
}

module.exports = IngredientsService