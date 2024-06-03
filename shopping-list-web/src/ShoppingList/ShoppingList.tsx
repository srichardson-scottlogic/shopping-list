import { useState, useEffect } from "react";
import "./ShoppingList.css";

import InputText from "../InputText/InputText";
import List from "../ListComponents/List/List";
import IListItem from "../ListItem/IListItem";
import InputCategory from "../InputCategory/InputCategory";
import {
  getListData,
  addItemsDataToList,
} from "../utilities/httpMethods/shoppingListMethods";
import {
  addCategoryDataForProduct,
  getCategoryDataResponseForProduct,
} from "../utilities/httpMethods/productMethods";

export default function ShoppingList() {
  const [items, setItems] = useState<Map<string, IListItem[]>>(
    new Map<string, IListItem[]>(),
  );
  const [currentProduct, setCurrentProduct] = useState<string>("");
  const [currentAmount, setCurrentAmount] = useState<string>("");
  const [categoryFound, setCategoryFound] = useState(true);

  const getAndDisplayListData = async () => {
    const result = await getListData();
    setItems(result);
  };

  useEffect(() => {
    getAndDisplayListData().catch((error) => {
      console.error("Error: ", error);
    });
  }, []);

  const handleItemSubmit = async () => {
    const category = await getCategoryDataForProduct(currentProduct);
    if (category) {
      await postNewItemAndDisplayNewList(
        category,
        currentProduct,
        currentAmount,
      );
      setCurrentProduct("");
      setCurrentAmount("");
    }
  };

  const handleCategorySubmit = async (category: string) => {
    await addCategoryDataForProduct(currentProduct, category);
    setCategoryFound(true);
    await postNewItemAndDisplayNewList(category, currentProduct, currentAmount);
    setCurrentProduct("");
    setCurrentAmount("");
  };

  const getCategoryDataForProduct = async (product: string) => {
    try {
      const result = await getCategoryDataResponseForProduct(product);
      if (result.error === "Product not found") {
        setCategoryFound(false);
        return;
      }
      return result.category;
    } catch (error) {
      console.error("Error: ", error);
      return "miscellaneous"; //TODO: Improve this error handling
    }
  };

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
        {categoryFound && (
          <InputText
            currentAmount={currentAmount}
            currentProduct={currentProduct}
            setCurrentProduct={setCurrentProduct}
            setCurrentAmount={setCurrentAmount}
            handleSubmit={handleItemSubmit}
          />
        )}
        {!categoryFound && (
          <InputCategory
            product={currentProduct}
            handleSubmit={handleCategorySubmit}
          />
        )}
      </div>
    </>
  );
}
