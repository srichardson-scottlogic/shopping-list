from typing import List
from flask import Flask, request, jsonify, make_response
from api.models.product import Product
from api.models.products import Products
from api.models.recipe import Recipe
from api.models.recipes import Recipes
from api.models.shoppingList import ShoppingList
from api.models.shoppingListItem import ShoppingListItem


app = Flask(__name__)

products = Products()
shoppingList = ShoppingList()
recipes = Recipes()


@app.before_request
def handle_preflight():
    if request.method == "OPTIONS":
        return _build_cors_preflight_response()


@app.get("/products")
def get_all_product_data():
    return _corsify_and_jsonify_response(products.data)


@app.get("/products/<name>")
def get_product_data(name: str):
    product = products.get_product_information(name)
    if product:
        return _corsify_and_jsonify_response(product)
    return _corsify_and_jsonify_response({"error": "Product not found"}), 404


@app.post("/products")  # TODO: Deal with categories and validation on those
def add_ingredient():
    if request.is_json:
        try:  # TODO: Use marshmellow here
            product = Product(**request.get_json())
            products.add_product(product)
            return _corsify_and_jsonify_response(product.__dict__), 201
        except TypeError:
            return (
                _corsify_and_jsonify_response(
                    {"error": "Request must be a JSON ingredient"}
                ),
                415,
            )
    return (
        _corsify_and_jsonify_response({"error": "Request must be a JSON ingredient"}),
        415,
    )


@app.get("/recipes")
def get_all_recipes():
    return _corsify_and_jsonify_response(recipes.data)


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
            return _corsify_and_jsonify_response(recipes.data), 201
        except TypeError:
            return (
                _corsify_and_jsonify_response(
                    {"error": "Request must be a JSON recipe"}
                ),
                415,
            )
    return (
        _corsify_and_jsonify_response({"error": "Request must be a JSON recipe"}),
        415,
    )


@app.get("/shoppingList")
def get_shopping_list():
    return _corsify_and_jsonify_response(shoppingList.data)


@app.post("/shoppingList")
def add_items_to_list():
    if request.is_json:
        try:  # TODO: Use marshmellow here
            items = []
            for item in request.get_json():
                items.append(ShoppingListItem(**item))
            shoppingList.add_products_to_list(items)
            return _corsify_and_jsonify_response(shoppingList.data), 201
        except TypeError:
            return (
                _corsify_and_jsonify_response(
                    {"error": "Request must be a JSON shopping list"}
                ),
                415,
            )
    return (
        _corsify_and_jsonify_response(
            {"error": "Request must be a JSON shopping list"}
        ),
        415,
    )


def _build_cors_preflight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "*")
    response.headers.add("Access-Control-Allow-Methods", "*")
    return response


def _corsify_and_jsonify_response(data):
    response = jsonify(data)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response
