TO-DO:

ADD CONTRIBUTION ROUTE
SANITIZE
MAKE 400 PATHS
TESTS

recipes - get, post
ingredient - post 

TESTS

seeding script:

psql -U dunder_mifflin -d recipe-builder -f ./seeds/seed.recipe-builder.sql

join recipe table w/ contributions 

SELECT 
recipe.recipe_name as recipe,
ingredient.ingredient_name as ingredient,
users.user_name as contributor
FROM recipe JOIN contribution ON recipe.id = contribution.recipe_id
JOIN ingredient ON ingredient.id = contribution.ingredient_id
JOIN users ON users.id = contribution.user_id;