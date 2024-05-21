from api.models.ingredient import Ingredient


class Recipe:
    def __init__(self, name, numberOfPortions, ingredients):
        self.name = name
        self.numberOfPortions = numberOfPortions
        self.ingredients = ingredients

    # def add_ingredient_to_recipe(self, ingredient: Ingredient):
    #     self.ingredients.append(ingredient.__dict__)
