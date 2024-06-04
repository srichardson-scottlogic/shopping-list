import IListItem from "../../ListItem/IListItem";
import IRecipe from "../../Recipes/IRecipe";

const objectToMap = (obj: Map<string, IRecipe>) =>
  new Map<string, IRecipe>(Object.entries(obj));

export const getRecipeData = async () => {
  const response = await fetch("http://127.0.0.1:5000/recipes");
  const result = await response.json();
  return objectToMap(result);
};

export const postRecipeData = async (
  recipeName: string,
  numberOfPortions: number,
  ingredients: IListItem[]
) => {
  const data = {
    name: recipeName,
    numberOfPortions: numberOfPortions,
    ingredients: ingredients,
  };
  const response = await fetch("http://127.0.0.1:5000/recipes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return objectToMap(result);
};
