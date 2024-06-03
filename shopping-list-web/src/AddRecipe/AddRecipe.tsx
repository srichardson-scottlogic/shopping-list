import { Dispatch, useState } from "react";
import IListItem from "../ListItem/IListItem";
import IRecipe from "../Recipes/IRecipe";
import InputText from "../InputText/InputText";
import ListDisplay from "../ListDisplay/ListDisplay";

export default function AddRecipe(props: {
  setRecipes: Dispatch<React.SetStateAction<Map<string, IRecipe>>>;
}) {
  const [recipeName, setRecipeName] = useState("");
  const [numberOfPortions, setNumberOfPortions] = useState(1);
  const [ingredients, setIngredients] = useState<IListItem[]>([]);

  const [inputtingNewRecipe, setInputtingNewRecipe] = useState(false);
  const [currentProduct, setCurrentProduct] = useState("");
  const [currentAmount, setCurrentAmount] = useState("");

  const postRecipeData = async () => {
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
    const objectToMap = (obj: Map<string, IRecipe>) =>
      new Map<string, IRecipe>(Object.entries(obj));
    props.setRecipes(objectToMap(result));
  };

  const handleAddIngredients = () => {
    const newIngredientList = [
      ...ingredients,
      {
        product: currentProduct,
        amount: currentAmount,
      },
    ];
    setIngredients(newIngredientList);
    setCurrentAmount("");
    setCurrentProduct("");
  };

  const handleRecipeSubmit = async () => {
    await postRecipeData();
    setInputtingNewRecipe(false);
    setIngredients([]);
  };

  return (
    <>
      <ListDisplay items={ingredients} />
      {!inputtingNewRecipe && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setInputtingNewRecipe(!inputtingNewRecipe);
          }}
        >
          <input
            type="text"
            aria-label="recipeNameInput"
            placeholder="recipe name"
            onChange={(e) => setRecipeName(e.target.value)}
          />
          <input
            type="number"
            aria-label="numberOfPortionsInput"
            placeholder="number of portions"
            onChange={(e) => setNumberOfPortions(Number(e.target.value))}
          />
          <button type="submit">Create recipe</button>
        </form>
      )}
      {inputtingNewRecipe && (
        <>
          <InputText
            currentProduct={currentProduct}
            currentAmount={currentAmount}
            setCurrentProduct={setCurrentProduct}
            setCurrentAmount={setCurrentAmount}
            handleSubmit={handleAddIngredients}
          />
          <button type="submit" onClick={handleRecipeSubmit}>
            Add Recipe
          </button>
        </>
      )}
    </>
  );
}
