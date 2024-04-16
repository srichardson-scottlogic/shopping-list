import ListItemInterface from "./IListItem";
import "./ListItem.css";

export default function ListItem(props: ListItemInterface) {
  return (
    <div className="list-items">
      <input type="checkbox" id={props.product} name={props.product} />
      <label htmlFor={props.product}>
        {props.product + " : " + props.amount}
      </label>
    </div>
  );
}
