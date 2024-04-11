from flask import Flask, request, jsonify

from api.models.product import Product
from api.models.products import Products
from api.models.recipe import Recipe
from api.models.recipes import Recipes


app = Flask(__name__)

products = Products()
recipes = Recipes()


@app.get("/products")
def get_all_product_data():
    return jsonify(products.data)


@app.get("/products/<name>")
def get_product_data(name: str):
    product = products.get_product_information(name)
    if product:
        return jsonify(product)
    return {"error": "Product not found"}, 404


@app.post("/products")  # TODO: Deal with categories and validation on those
def add_ingredient():
    if request.is_json:
        try:  # TODO: Use marshmellow here
            product = Product(**request.get_json())
            products.add_product(product)
            return jsonify(product.__dict__), 201
        except TypeError:
            return {"error": "Request must be a JSON ingredient"}, 415
    return {"error": "Request must be a JSON ingredient"}, 415


@app.get("/recipes")
def get_all_recipes():
    return jsonify(recipes.data)


@app.get("/recipes/<name>")
def get_recipe_data(name: str):
    recipe = recipes.get_recipe_data(name)
    if recipe:
        return jsonify(recipe)
    return {"error": "Recipe not found"}, 404


@app.post("/recipes")  # TODO: Deal with categories and validation on those
def add_recipe():
    if request.is_json:
        try:  # TODO: Use marshmellow here
            recipe = Recipe(**request.get_json())
            recipes.add_recipe(recipe)
            return jsonify(recipe.__dict__), 201
        except TypeError:
            return {"error": "Request must be a JSON recipe"}, 415
    return {"error": "Request must be a JSON recipe"}, 415
