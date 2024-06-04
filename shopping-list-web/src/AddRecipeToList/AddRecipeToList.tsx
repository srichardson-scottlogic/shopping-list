import { useState } from "react";
import IListItem from "../ListItem/IListItem";
import "./AddRecipeToList.css";
import { addItemsDataToList } from "../utilities/httpMethods/shoppingListMethods";

export default function AddRecipeToList(props: {
  recipeName: string;
  items: IListItem[];
}) {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const handleClick = () => {
    setButtonDisabled(!buttonDisabled);
    addItemsDataToList(props.items);
  };

  const buttonText = buttonDisabled
    ? props.recipeName + " added to shopping list"
    : "Add " + props.recipeName + " to shopping list";

  return (
    <button
      type="submit"
      className="add-recipe-to-list-button"
      disabled={buttonDisabled}
      onClick={handleClick}
    >
      {buttonText}
    </button>
  );
}
