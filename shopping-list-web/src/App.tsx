import { useState } from "react";
import "./App.css";

import IListItem from "./ListItem/IListItem";
import CollapsibleCategory from "./CollapsibleCategory/CollapsibleCategory";
import InputText from "./InputText/InputText";

function App() {
  const [items, setItems] = useState<IListItem[]>([
    { product: "cheese", amount: "30g" },
  ]);

  return (
    <>
      <h1>Shopping List</h1>
      <div id="list-container">
        <CollapsibleCategory category="dairy" items={items} />
        <InputText
          handleSubmit={(product: string, amount: string) => {
            setItems([...items, { product: product, amount: amount }]);
          }}
        />
      </div>
    </>
  );
}

export default App;
