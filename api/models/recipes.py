from api.models.recipe import Recipe


class Recipes:
    data = {
        "macaroni cheese": {
            "numberOfPortions": 2,
            "ingredients": [
                {"product": "cheese", "amount": "30g"},
                {"product": "macaroni", "amount": "250g"}
            ]
        }
    }

    def add_recipe(self, recipe: Recipe):
        if recipe.name in self.data:
            return  # TODO: Return error/ update
        # TODO: Make this more generic
        self.data[recipe.name.lower()] = {
            "numberOfPortions": recipe.numberOfPortions,
            "ingredients": recipe.ingredients
        }

    def get_recipe_data(self, name):
        if name in self.data:
            return self.data[name.lower()]
