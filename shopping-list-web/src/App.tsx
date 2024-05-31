import { useState } from "react";
import "./App.css";

import ShoppingList from "./ShoppingList/ShoppingList";
import Header from "./Header/Header";
import Recipes from "./afgsfdgsdf/Recipes";

function App() {
  const [showShoppingList, setShowShoppingList] = useState(true);
  const [showRecipes, setShowRecipes] = useState(false);

  const displayShoppingListAndHideRecipes = () => {
    setShowShoppingList(true);
    setShowRecipes(false);
  };

  const displayRecipesAndHideShoppingList = () => {
    setShowShoppingList(false);
    setShowRecipes(true);
  };

  return (
    <>
      <Header
        onShoppingListClick={displayShoppingListAndHideRecipes}
        onRecipesClick={displayRecipesAndHideShoppingList}
      />
      {showShoppingList && <ShoppingList />}
      {showRecipes && <Recipes />}
    </>
  );
}

export default App;
