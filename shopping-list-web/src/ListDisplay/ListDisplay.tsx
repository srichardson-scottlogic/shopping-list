import IListItem from "../ListItem/IListItem";
import ListItem from "../ListItem/ListItem";
import "./ListDisplay.css";

export default function ListDisplay(props: { items: IListItem[] }) {
  const createModifyObject = (item) => {
    return {
      delete: () => props.onDelete(item)
    }
  }

  const items = props.items.map((item, i) => (
    <ListItem key={i} product={item.product} amount={item.amount} backgroundColor={i%2 ? "#FFFDD0" : "#BBDDD0"} modifyFunctions={createModifyObject(item)} />
  ));
  return <ul className="list-display">{items}</ul>;
}
