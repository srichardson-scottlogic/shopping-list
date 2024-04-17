import { useState } from "react";
import "./App.css";

import InputText from "./InputText/InputText";
import List from "./List/List";
import IListItem from "./ListItem/IListItem";

function App() {
  const initialItems = new Map<string, IListItem[]>();
  initialItems.set("dairy", [{ product: "cheese", amount: "30g" }]);
  initialItems.set("dried goods", [{ product: "pasta", amount: "300g" }]);

  const [items, setItems] = useState<Map<string, IListItem[]>>(initialItems);

  return (
    <>
      <h1>Shopping List</h1>
      <div id="list-container">
        <List list={items} />
        <InputText
          handleSubmit={(product: string, amount: string, category: string) => {
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
          }}
        />
      </div>
    </>
  );
}

export default App;
