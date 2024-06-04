import { useEffect, useState } from "react";
import RecipeList from "../ListComponents/RecipeList/RecipeList";
import AddRecipe from "../AddRecipe/AddRecipe";
import IRecipe from "./IRecipe";
import { getRecipeData } from "../utilities/httpMethods/recipeMethods";

export default function Recipes() {
  const initialRecipes = new Map<string, IRecipe>();
  const [recipes, setRecipes] = useState<Map<string, IRecipe>>(initialRecipes);

  const getAndSetRecipeData = async () => {
    const result = await getRecipeData();
    setRecipes(result);
  };

  useEffect(() => {
    getAndSetRecipeData().catch((error) => {
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
