import ListDisplay from "../../ListDisplay/ListDisplay";
import IListItem from "../../ListItem/IListItem";

import "../CollapsibleComponent.css";

import { useState, useRef } from "react";

export default function CollapsibleRecipe(props: {
  recipe: string;
  numberOfPortions: number;
  items: IListItem[];
}) {
  const [open, setOpen] = useState(true);
  const contentRef = useRef<HTMLDivElement>();
  const childHeight = contentRef.current ? contentRef.current.scrollHeight : 0;

  return (
    <div>
      <button className="collapse-button" onClick={() => setOpen(!open)}>
        {props.recipe}
      </button>
      <div
        className="collapse-parent"
        ref={contentRef} //TODO: Why is ref underlined? What is ref DOING
        style={open ? { height: childHeight + "px" } : { height: "0px" }}
      >
        <h3>number of portions: {props.numberOfPortions}</h3>
        <ListDisplay items={props.items} />
        <hr />
      </div>
    </div>
  );
}
