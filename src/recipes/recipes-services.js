const xss = require('xss')

const RecipesService = {
    getAllRecipes(db) {
        // return db
        // .from('recipe')
        // .select(
        // 'recipe.recipe_name',
        // 'ingredient.ingredient_name',
        // 'users.user_name'
        //)
        // .join('contribution', 'recipe.id', '=', 'contribution.recipe_id')
        // .join('ingredient', 'ingredient.id', '=', 'contribution.ingredient_id')
        // .join('users', 'users.id', '=', 'contribution.user_id')

        return db.select('*').from('recipe')
    },
    getRecipeById(db, id) {
        return db
            .from('recipe')
            .select(
                'ingredient.ingredient_name as ingredient',
                'ingredient.id as ingredient_id',
                'users.user_name as contributor',
                'users.id as user_id',
                'recipe.recipe_name as recipe',
                'recipe.id as recipe_id',
                'contribution.id as id'
            )
            .leftJoin('contribution', 'recipe.id', '=', 'contribution.recipe_id')
            .leftJoin('ingredient', 'ingredient.id', '=', 'contribution.ingredient_id')
            .leftJoin('users', 'users.id', '=', 'contribution.user_id')
            .where('recipe.id', id)
    },
    generateRecipeName(db, name) {
        return db
            .insert(name)
            .into('recipe')
            .returning('*')
            .then(rows => rows[0])
    },
    updateRecipe(db, id, fields) {
        return db('recipe')
            .where('id', id)
            .update(fields)
            .returning('*')
            .then(rows => rows[0])
    }
}

module.exports = RecipesService