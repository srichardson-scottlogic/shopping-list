import { useState, useEffect } from "react";
import "./ShoppingList.css";
import List from "../ListComponents/List/List";
import IListItem from "../ListItem/IListItem";
import {
  getListData,
  addItemsDataToList,
} from "../utilities/httpMethods/shoppingListMethods";
import AddItem from "../AddItem/AddItem";

export default function ShoppingList() {
  const [items, setItems] = useState<Map<string, IListItem[]>>(
    new Map<string, IListItem[]>(),
  );

  const getAndDisplayListData = async () => {
    const result = await getListData();
    setItems(result);
  };

  useEffect(() => {
    getAndDisplayListData().catch((error) => {
      console.error("Error: ", error);
    });
  }, []);

  const postNewItemAndDisplayNewList = async (
    category: string,
    product: string,
    amount: string,
  ) => {
    const result = await addItemsDataToList([
      {
        category: category,
        product: product,
        amount: amount,
      },
    ]);
    setItems(result);
  };

  return (
    <>
      <h1>Shopping List</h1>
      <div id="list-container">
        <List list={items} />
        <AddItem postNewItemAndDisplayNewList={postNewItemAndDisplayNewList} />
      </div>
    </>
  );
}
