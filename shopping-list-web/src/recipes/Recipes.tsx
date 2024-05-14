import { useState } from "react";
import IRecipe from "./IRecipe";
import RecipeList from "../RecipeList/RecipeList";

export default function Recipes() {
  const initialRecipes = new Map<string, IRecipe>();
  initialRecipes.set("macaroni cheese", {
    numberOfPortions: 2,
    ingredients: [
      { product: "cheese", amount: "30g" },
      { product: "pasta", amount: "300g" },
    ],
  });
  initialRecipes.set("cheesecake", {
    numberOfPortions: 6,
    ingredients: [{ product: "sugar", amount: "300g" }],
  });

  const [recipes, setRecipes] = useState<Map<string, IRecipe>>(initialRecipes);

  return (
    <>
      <h1>Recipes</h1>
      <RecipeList recipes={recipes} />
    </>
  );
}
