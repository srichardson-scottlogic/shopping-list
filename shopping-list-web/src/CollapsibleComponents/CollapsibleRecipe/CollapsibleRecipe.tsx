import AddRecipeToList from "../../AddRecipeToList/AddRecipeToList";
import ListDisplay from "../../ListDisplay/ListDisplay";
import IListItem from "../../ListItem/IListItem";

import "../CollapsibleComponent.css";

import { useState, useRef } from "react";

export default function CollapsibleRecipe(props: {
  recipe: string;
  numberOfPortions: number;
  items: IListItem[];
}) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const childHeight = contentRef.current ? contentRef.current.scrollHeight : 0;

  return (
    <div>
      <button className="collapse-button" onClick={() => setOpen(!open)}>
        {props.recipe}
      </button>
      <AddRecipeToList recipeName={props.recipe} items={props.items} />
      <div
        className="collapse-parent"
        ref={contentRef}
        style={open ? { height: childHeight + "px" } : { height: "0px" }}
      >
        <h3>number of portions: {props.numberOfPortions}</h3>
        <ListDisplay items={props.items} />
        <hr />
      </div>
    </div>
  );
}
