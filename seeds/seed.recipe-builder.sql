
BEGIN; 

TRUNCATE 
    recipe,
    ingredient,
    users,
    contribution
    RESTART IDENTITY CASCADE;

--upperlower longer than 8 chars, special char
INSERT INTO users (user_name, password)
VALUES
    ('Beyonce', '$2a$12$i8hRWLFskpj9tfQj6K0YAOTm9H4qJF.YOMu5oDsaJkVsMnjdnVgna'), -- Jayz..33
    ('Childish Gambino', '$2a$12$xrj8iaFkqyir3Hz81ln9AuUMmRphYcaedRWT8as9M7oZ632udXRRK'), -- Atlanta..33
    ('Cher', '$2a$12$JkHJlNrmiZPNbtqxG6SJVeO/AU4s2TQ7hpW2eg6gx9oRzFaZnK3Hi'), -- Bear..33
    ('Nosaj Jason','$2a$12$xCRqiS/WL5QooIsT3h9gg.371TN54YCBD65D5Pgk4EtRDpI2yeOfG'),--Devil..33
    ('Harold Potter', '$2a$12$TYMXcydbtN/ZqdmjRkA1sO.rlReUPIFIhuuYHE6nr4kFXVw5hBJbe'), --Ginny..33
    ('Ronaldo Weaslo', '$2a$12$XBbdDLrMvZAIS0Eg7T.7TuOu6g/zlmxxlcVGAJm1B/lKNyUOtbz1O'); --Hermione..33
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

INSERT INTO recipe (recipe_name, completed)
VALUES 
    ('Super Saucy Synonyms', true),
    ('Randomnly Rauncy Ritters', true),
    ('pending recipe...', false),
    ('pending recipe...',false);
    -- 5 values

INSERT INTO contribution (contribution_name, ingredient_id, recipe_id, user_id)
VALUES
    ('Super Awesome', 3, 1, 1),
    ('Super Bloopey', 14, 1, 2),
    ('Super Drake', 12, 1, 3),
    ('Super Baron',11, 1, 4),
    ('Amazing stuff', 11, 2, 2),
    ('Amazing, I love Cher!', 1, 2, 4),
    ('PS, I love you', 4, 2, 5),
    ('THINKFUL', 9, 2, 6),
    ('Is this a GAME?', 1, 3, 2),
    ('Puppies', 3, 3, 1),
    ('Omg I am a Vegan', 12, 3, 5),
    ('how now brown cow', 1, 4, 4),
    ('CARTER! LEE!', 15, 4, 1),
    ('BARBERS', 3, 4, 2);
    
COMMIT;
