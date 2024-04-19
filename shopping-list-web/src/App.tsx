import { useState } from "react";
import "./App.css";

import InputText from "./InputText/InputText";
import List from "./List/List";
import IListItem from "./ListItem/IListItem";
import InputCategory from "./InputCategory/InputCategory";

function App() {
  const initialItems = new Map<string, IListItem[]>();
  initialItems.set("dairy", [{ product: "cheese", amount: "30g" }]);
  initialItems.set("dried goods", [{ product: "pasta", amount: "300g" }]);

  const [items, setItems] = useState<Map<string, IListItem[]>>(initialItems);
  const [currentProduct, setCurrentProduct] = useState<string>("");
  const [currentAmount, setCurrentAmount] = useState<string>("");
  const [categoryFound, setCategoryFound] = useState(true);

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

  const putProductInCorrectCategory = (
    product: string,
    amount: string,
    category: string
  ) => {
    const newItems = new Map(items);
    if (items.has(category)) {
      newItems.set(category, [
        ...items.get(category)!,
        { product: product, amount: amount },
      ]);
    } else {
      newItems.set(category, [{ product: product, amount: amount }]);
    }
    setItems(newItems);
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
                putProductInCorrectCategory(
                  currentProduct,
                  currentAmount,
                  category
                );
              }
            }}
          />
        )}
        {!categoryFound && (
          <InputCategory
            product={currentProduct}
            handleSubmit={(category: string) => {
              putProductInCorrectCategory(
                currentProduct,
                currentAmount,
                category
              );
              setCategoryFound(true);
              postCategoryDataForProduct(currentProduct, category);
            }}
          />
        )}
      </div>
    </>
  );
}

export default App;
