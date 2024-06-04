import IListItem from "../ListItem/IListItem";
import ListItem from "../ListItem/ListItem";
import "./ListDisplay.css";

export default function ListDisplay(props: { items: IListItem[], checked?: boolean }) {
  const items = props.items.map((item, i) => (
    <ListItem key={i} product={item.product} amount={item.amount} checked={props.checked} />
  ));
  return <ul className="list-display">{items}</ul>;
}
