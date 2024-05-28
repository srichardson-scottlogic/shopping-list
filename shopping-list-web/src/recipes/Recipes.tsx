import { useEffect, useState } from "react";
import IRecipe from "./IRecipe";
import RecipeList from "../ListComponents/RecipeList/RecipeList";
import AddRecipe from "../AddRecipe/AddRecipe";

export default function Recipes() {
  const initialRecipes = new Map<string, IRecipe>();
  const [recipes, setRecipes] = useState<Map<string, IRecipe>>(initialRecipes);

  const getRecipeData = async () => {
    const response = await fetch("http://127.0.0.1:5000/recipes");
    const result = await response.json();
    const objectToMap = (obj: Map<string, IRecipe>) =>
      new Map<string, IRecipe>(Object.entries(obj));
    setRecipes(objectToMap(result));
  };

  useEffect(() => {
    getRecipeData().catch((error) => {
      console.error("Error: ", error);
    });
  }, []);

  return (
    <>
      <h1>Recipes</h1>
      <RecipeList recipes={recipes} />
      <AddRecipe setRecipes={setRecipes} />
    </>
  );
}
