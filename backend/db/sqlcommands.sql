-- sql commands used
INSERT INTO recipe (recipe_name, recipe_type, recipe_directions, recipe_notes) VALUES ('Carrot Cake', 'Dessert', 'Do things to make this special dish', 'the notes go here')
INSERT into ingredients (recipe_id, ingredient) values (2, 'flour')
select * from recipes left join ingredients ON ingredients.recipe_id = recipes.id
SELECT * FROM recipes WHERE id = resipies.id 