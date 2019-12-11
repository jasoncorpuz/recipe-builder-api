const xss = require('xss')

const RecipesService = {
    getAllRecipes(db) {
        // return db
        // .from('recipe')
        // .select(
        //     'recipe.recipe_name',
        //     'ingredient.ingredient_name',
        //     'users.user_name'
        // )
        // .leftJoin('contribution', 'recipe.id', '=', 'contribution.recipe_id')
        // .leftJoin('ingredient', 'ingredient.id', '=', 'contribution.ingredient_id')
        // .leftJoin('users', 'users.id', '=', 'contribution.user_id')

        return db.select('*').from('recipe')
    },
    getRecipeById(db, id) {
        return db
            .from('recipe')
            .select(
                'ingredient.ingredient_name as ingredient',
                'users.user_name as contributor'
            )
            .leftJoin('contribution', 'recipe.id', '=', 'contribution.recipe_id')
            .leftJoin('ingredient', 'ingredient.id', '=', 'contribution.ingredient_id')
            .leftJoin('users', 'users.id', '=', 'contribution.user_id')
            .where('recipe.id', id)
    },
    contributeToRecipe(db, contribution) {
        return db
            .insert(contribution)
            .into('contribution')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    }
}

module.exports = RecipesService