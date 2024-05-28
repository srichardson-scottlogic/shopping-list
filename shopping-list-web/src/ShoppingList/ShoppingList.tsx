import { useState, useEffect } from "react";
import "./ShoppingList.css";

import InputText from "../InputText/InputText";
import List from "../ListComponents/List/List";
import IListItem from "../ListItem/IListItem";
import InputCategory from "../InputCategory/InputCategory";

export default function ShoppingList() {
  const [items, setItems] = useState<Map<string, IListItem[]>>(
    new Map<string, IListItem[]>()
  );
  const [currentProduct, setCurrentProduct] = useState<string>("");
  const [currentAmount, setCurrentAmount] = useState<string>("");
  const [categoryFound, setCategoryFound] = useState(true);

  const getListData = async () => {
    const response = await fetch("http://127.0.0.1:5000/shoppingList");
    const result = await response.json();

    const objectToMap = (obj: Map<string, IListItem[]>) => {
      return new Map<string, IListItem[]>(Object.entries(obj));
    };
    setItems(objectToMap(result));
  };

  useEffect(() => {
    getListData().catch((error) => {
      console.error("Error: ", error);
    });
  }, []);

  const getCategoryDataForProduct = async (product: string) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/products/" + product);
      const result = await response.json();
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

  const postCategoryDataForProduct = (product: string, category: string) => {
    const data = {
      name: product,
      category: category,
    };
    fetch("http://127.0.0.1:5000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  const postNewItem = async (
    category: string,
    product: string,
    amount: string
  ) => {
    const data = {
      category: category,
      item: {
        product: product,
        amount: amount,
      },
    };
    const response = await fetch("http://127.0.0.1:5000/shoppingList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();

    const objectToMap = (obj: Map<string, IListItem[]>) => {
      return new Map<string, IListItem[]>(Object.entries(obj));
    };
    setItems(objectToMap(result));
  };

  return (
    <>
      <h1>Shopping List</h1>
      <div id="list-container">
        <List list={items} />
        {categoryFound && (
          <InputText
            setCurrentProduct={setCurrentProduct}
            setCurrentAmount={setCurrentAmount}
            handleSubmit={async () => {
              const category = await getCategoryDataForProduct(currentProduct);
              if (category) {
                postNewItem(category, currentProduct, currentAmount); //TODO: get rid of the product and amount after this
              }
            }}
          />
        )}
        {!categoryFound && (
          <InputCategory
            product={currentProduct}
            handleSubmit={(category: string) => {
              setCategoryFound(true);
              postCategoryDataForProduct(currentProduct, category);
              postNewItem(category, currentProduct, currentAmount);
            }}
          />
        )}
      </div>
    </>
  );
}
