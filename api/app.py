from flask import Flask, request, jsonify


app = Flask(__name__)

ingredients = [
    {
        "ingredientName": "cheese",
        "category": "diary"
    },
    {
        "ingredientName": "macaroni",
        "category": "dried goods"
    }
]


@app.get("/ingredients")
def get_ingredients():
    return jsonify(ingredients)


@app.post("/ingredients")
def add_ingredient():
    if request.is_json:
        ingredient = request.get_json()
        ingredients.append(ingredient)
        return ingredient, 201
    return {"error": "Request must be JSON"}, 415