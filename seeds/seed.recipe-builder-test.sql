BEGIN;

TRUNCATE recipe,
ingredient,
users,
contribution RESTART IDENTITY CASCADE;

INSERT INTO
    users (user_name, password)
VALUES
    (
        'test user 1',
        '$2a$12$My5kiW7kQqHx3byMN221G.yW.1GS1PLJmBHj7AAaEPEhZQ3dT1dzi'
    ),
    (
        'test user 2',
        '$2a$12$My5kiW7kQqHx3byMN221G.yW.1GS1PLJmBHj7AAaEPEhZQ3dT1dzi'
    ),
    (
        'test user 3',
        '$2a$12$My5kiW7kQqHx3byMN221G.yW.1GS1PLJmBHj7AAaEPEhZQ3dT1dzi'
    ),
    (
        'test user 4',
        '$2a$12$My5kiW7kQqHx3byMN221G.yW.1GS1PLJmBHj7AAaEPEhZQ3dT1dzi'
    );

INSERT INTO
    ingredient (ingredient_name)
VALUES
    ('Apples'),
    ('Baking Powder'),
    ('Bread'),
    ('Butter'),
    ('Carrots'),
    ('Cheese'),
    ('Chicken Breast');

INSERT INTO
    recipe (recipe_name, completed)
VALUES
    ('Test Recipe 1', true),
    ('Test Recipe 2', true),
    ('Test Recipe 3', false);

INSERT INTO
    contribution (
        contribution_name,
        ingredient_id,
        recipe_id,
        user_id
    )
VALUES
    ('contribution 1', 1, 1, 1),
    ('contribution 2', 2, 1, 2),
    ('contribution 3', 3, 1, 3),
    ('contribution 4', 4, 1, 4),
    ('contribution 5', 5, 2, 1),
    ('contribution 6', 6, 2, 2),
    ('contribution 7', 7, 2, 3),
    ('contribution 8', 5, 2, 4),
    ('contribution 9', 1, 3, 1),
    ('contribution 10', 2, 3, 2);
    
 COMMIT;