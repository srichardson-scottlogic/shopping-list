import { useState, useEffect } from "react";
import "./ShoppingList.css";
import List from "../ListComponents/List/List";
import IListItem from "../ListItem/IListItem";
import {
  getListData,
  addItemsDataToList,
  deleteItemFromList,
} from "../utilities/httpMethods/shoppingListMethods";
import AddItem from "../AddItem/AddItem";

export default function ShoppingList() {
  const [items, setItems] = useState<Map<string, IListItem[]>>(
    new Map<string, IListItem[]>(),
  );
  const [currentProduct, setCurrentProduct] = useState("");
  const [currentAmount, setCurrentAmount] = useState("");

  const getAndDisplayListData = async () => {
    const result = await getListData();
    setItems(result);
  };

  useEffect(() => {
    getAndDisplayListData().catch((error) => {
      console.error("Error: ", error);
    });
  }, []);

  const postNewItemAndDisplayNewList = async (category: string) => {
    const result = await addItemsDataToList([
      {
        category: category,
        product: currentProduct,
        amount: currentAmount,
      },
    ]);
    setItems(result);
  };

  const deleteitemAndDisplayNewList = async (item: IListItem) => {
    const result = await deleteItemFromList([item]);
    setItems(result);
  };

  return (
    <>
      <h1>Shopping List</h1>
      <div id="list-container">
        <List list={items} onDelete={deleteitemAndDisplayNewList} />
        <AddItem
          currentProduct={currentProduct}
          setCurrentProduct={setCurrentProduct}
          currentAmount={currentAmount}
          setCurrentAmount={setCurrentAmount}
          handleItemSubmit={postNewItemAndDisplayNewList}
        />
      </div>
    </>
  );
}
