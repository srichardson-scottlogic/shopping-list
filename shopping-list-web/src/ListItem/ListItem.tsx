import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ListItemInterface from "./IListItem";
import "./ListItem.css";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";

export default function ListItem(props: ListItemInterface) {
  return (
    <div className="list-items">
      <div>
      {props.checked && (
        <input type="checkbox" id={props.product} name={props.product} />
      )}
      <label htmlFor={props.product}>
        {props.product + " : " + props.amount}
        </label>
      </div>
      <FontAwesomeIcon icon={faTrash} onClick={props.onDelete} style={{cursor: "pointer"}} />
    </div>
  );
}
