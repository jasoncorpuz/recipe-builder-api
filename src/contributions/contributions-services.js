const xss = require('xss')

const ContributionServices = {
    getAllContributions(db) {
        return db.from('contribution').select('*')
    },
    getContributionsByUser(db, id) {
        //return all contributions by a user
        return db
            .from('contribution')
            .select(
                'users.user_name as contributor',
                'ingredient.ingredient_name as ingredient',
                'recipe.recipe_name as recipe',
                'recipe.id as recipe_id',
                'recipe.completed as completed',
                'contribution.id as id',
                'contribution.contribution_name as contribution_name'

            )
            .join('recipe', 'contribution.recipe_id', 'recipe.id')
            .join('ingredient', 'ingredient.id', 'contribution.ingredient_id')
            .join('users', 'users.id', 'contribution.user_id')
            .where('contribution.user_id', id)
    },
    contributeToRecipe(db, contribution) {
        return db
            .insert(contribution)
            .into('contribution')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    sanitizeContribution(contribution) {
        const { contribution_name } = contribution
        return {
            contribution_name: xss(contribution_name),
            ingredient_id: contribution.ingredient_id,
            recipe_id: contribution.recipe_id,
            user_id: contribution.user_id
        }
    },

    deleteContribution(db, id) {
        return db('contribution')
            .where('contribution.id', id)
            .delete()
    }
}

module.exports = ContributionServices