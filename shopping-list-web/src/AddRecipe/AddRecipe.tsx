import { Dispatch, useState } from "react";
import IListItem from "../ListItem/IListItem";
import IRecipe from "../Recipes/IRecipe";
import ListDisplay from "../ListDisplay/ListDisplay";
import { postRecipeData } from "../utilities/httpMethods/recipeMethods";
import AddItem from "../AddItem/AddItem";

export default function AddRecipe(props: {
  setRecipes: Dispatch<React.SetStateAction<Map<string, IRecipe>>>;
}) {
  const [recipeName, setRecipeName] = useState("");
  const [numberOfPortions, setNumberOfPortions] = useState(1);
  const [ingredients, setIngredients] = useState<IListItem[]>([]);

  const [inputtingNewRecipe, setInputtingNewRecipe] = useState(false);
  const [currentProduct, setCurrentProduct] = useState("");
  const [currentAmount, setCurrentAmount] = useState("");

  const postAndSetRecipeData = async () => {
    const result = await postRecipeData(
      recipeName,
      numberOfPortions,
      ingredients
    );
    props.setRecipes(result);
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
    await postAndSetRecipeData();
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
          <AddItem
            currentProduct={currentProduct}
            setCurrentProduct={setCurrentProduct}
            currentAmount={currentAmount}
            setCurrentAmount={setCurrentAmount}
            handleItemSubmit={handleAddIngredients}
          />
          <button type="submit" onClick={handleRecipeSubmit}>
            Add Recipe
          </button>
        </>
      )}
    </>
  );
}
