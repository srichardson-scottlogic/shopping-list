from api.models.recipe import Recipe


class Recipes:
    data = {
        "macaroni cheese": {
            "number_of_portions": 2,
            "ingredients": [
                {"name": "cheese", "amount": "30g"},
                {"name": "macaroni", "amount": "250g"}
            ]
        }
    }

    def add_recipe(self, recipe: Recipe):
        if recipe.name in self.data:
            return  # TODO: Return error/ update
        # TODO: Make this more generic
        self.data[recipe.name.lower()] = {
            "number of portions": recipe.number_of_portions,
            "ingredients": recipe.ingredients
        }

    def get_recipe_data(self, name):
        if name in self.data:
            return self.data[name.lower()]
