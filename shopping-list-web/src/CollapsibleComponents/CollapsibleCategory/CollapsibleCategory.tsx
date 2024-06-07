import ListDisplay from "../../ListDisplay/ListDisplay";
import IListItem from "../../ListItem/IListItem";
import "../CollapsibleComponent.css";

import { useState, useRef } from "react";

export default function CollapsibleCategory(props: {
  category: string;
  items: IListItem[];
  onDelete?: (item: IListItem) => void;
}) {
  const [open, setOpen] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);
  const childHeight = contentRef.current ? contentRef.current.scrollHeight : 0;

  return (
    <div>
      <button className="collapse-button" onClick={() => setOpen(!open)}>
        {props.category}
      </button>
      <div
        className="collapse-parent"
        ref={contentRef}
        style={open ? { height: childHeight + "px" } : { height: "0px" }}
      >
        <ListDisplay items={props.items} checked onDelete={props.onDelete} />
        <hr />
      </div>
    </div>
  );
}
