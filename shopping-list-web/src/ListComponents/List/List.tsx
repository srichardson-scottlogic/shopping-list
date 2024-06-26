import IListItem from "../../ListItem/IListItem";
import CollapsibleCategory from "../../CollapsibleComponents/CollapsibleCategory/CollapsibleCategory";

export default function List(props: {
  list: Map<string, IListItem[]>;
  onDelete?: (item: IListItem) => void;
}) {
  const listCategories = Array.from(props.list.keys()).map(
    (category: string, i: number) => {
      return (
        <CollapsibleCategory
          key={i}
          category={category}
          items={props.list.get(category)!}
          onDelete={props.onDelete}
        />
      );
    },
  );
  return listCategories;
}
