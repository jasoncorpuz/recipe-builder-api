# Recipe-Roulette API
live: https://serene-mesa-26740.herokuapp.com/api

This api allows users post contributions as well as get contributions and recipes.

## Users Endpoint

Get '/users'\
 Returns all users.

```
[
    {
        "id": 1,
        "user_name": "Beyonce"
    },
    {
        "id": 2,
        "user_name": "Childish Gambino"
    },
    ...
]
```

Get 'user/:user_id'\
    Returns user with that id.

```
[
    {
        "id": 1,
        "user_name": "Beyonce"
    }
]
```
## Recipes Endpoint

Get '/recipes'\
 Returns all recipes and their completed status.
```
[
    {
        "id": 1,
        "recipe_name": "Super Saucy Synonyms",
        "completed": true
    },
    {
        "id": 2,
        "recipe_name": "Randomnly Rauncy Ritters",
        "completed": true
    },
    ...
]
```
Get 'recipes/:recipe_id'\
    Returns recipe by recipe ID. This returns all ingredients in a recipe.
```
[
    {
        "ingredient": "Bread",
        "ingredient_id": 3,
        "contributor": "Beyonce",
        "user_id": 1,
        "recipe": "Super Saucy Synonyms",
        "recipe_id": 1,
        "id": 1
    },
    {
        "ingredient": "Olive Oil",
        "ingredient_id": 14,
        "contributor": "Childish Gambino",
        "user_id": 2,
        "recipe": "Super Saucy Synonyms",
        "recipe_id": 1,
        "id": 2
    },
...
]
```
## Contributions Endpoint

Get '/contributions/:user_id' \
 Gets all contributions by user.
```
[
    {
        "contributor": "Beyonce",
        "ingredient": "Bread",
        "contribution_name": "Super Awesome",
        "recipe": "Super Saucy Synonyms",
        "recipe_id": 1,
        "completed": true,
        "id": 1
    },
    {
        "contributor": "Beyonce",
        "ingredient": "Rice",
        "contribution_name": "CARTER! LEE!",
        "recipe": "Triumphant Sour Plate",
        "recipe_id": 4,
        "completed": true,
        "id": 13
    },
    ...
]
```
Post '/contributions'\
    Posts a contribution to a random recipe. User log in required.\
    ```
    const exampleBody = {
        contribution_name: 'contribution',\
        ingredient_id: 1
    }
    ```
    