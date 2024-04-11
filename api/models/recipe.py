from api.models.ingredient import Ingredient

class Recipe:
    def __init__(self, name, number_of_portions, ingredients):
        self.name = name
        self.number_of_portions = number_of_portions
        self.ingredients = ingredients

    # def add_ingredient_to_recipe(self, ingredient: Ingredient):
    #     self.ingredients.append(ingredient.__dict__)
