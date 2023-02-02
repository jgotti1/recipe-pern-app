-- sql commands used
INSERT INTO recipe (recipe_name, recipe_type, recipe_directions, recipe_notes) VALUES ('Carrot Cake', 'Dessert', 'Do things to make this special dish', 'the notes go here')
INSERT into ingredients (recipe_id, ingredient) values (2, 'flour')
select * from recipes left join ingredients ON ingredients.recipe_id = recipes.id
SELECT * FROM recipes WHERE id = recipes.id 
UPDATE recipes SET recipe_name = $1, recipe_type= $2, recipe_directions = $3, recipe_notes = $4  WHERE id = $5 RETURNING *
DELETE FROM recipes WHERE id = $1 RETURNING *