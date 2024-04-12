import ListItemInterface from "./IListItem";

export default function ListItem(props: ListItemInterface) {
  return <li>{props.product + " : " + props.amount}</li>;
}
