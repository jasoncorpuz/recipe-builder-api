BEGIN; 

TRUNCATE 
    recipe,
    ingredient,
    users,
    contribution
    RESTART IDENTITY CASCADE;

INSERT INTO users (user_name)
VALUES
    ('Beyonce'),
    ('Childish Gambino'),
    ('Cher'),
    ('Nosaj Jason'),
    ('Harold Potter'),
    ('Ronaldo Weaslo');
    -- 6 values

INSERT INTO ingredient (ingredient_name)
VALUES 
    ('Apples'),
    ('Baking Powder'),
    ('Bread'),
    ('Butter'),
    ('Carrots'),
    ('Cheese'),
    ('Chicken Breast'),
    ('Eggs'),
    ('Garlic'),
    ('Lemons'),
    ('Onions'),
    ('Sugar'),
    ('Soy Sauce'),
    ('Olive Oil'),
    ('Rice'),
    ('Pasta'),
    ('Tortillas');
    -- 17 values

INSERT INTO recipe (recipe_name)
VALUES 
    ('Super Saucy Synonyms'),
    ('Randomnly Rauncy Ritters'),
    ('Salmonly Seviche'),
    ('Bombastic Blissful Blackness'),
    ('Terrific Tyrannical Trapeze');
    -- 5 values

INSERT INTO contribution (contribution_name, ingredient_id, recipe_id, user_id)
VALUES
    ('Super Awesome', 3, 1, 1),
    ('What in the world!', 15, 1, 2),
    ('How does he dooo that?', 12, 1, 3),
    ('The last one for this nasty ass', 11, 1, 4);
    
COMMIT;
