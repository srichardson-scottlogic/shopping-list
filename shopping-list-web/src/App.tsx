import { useState } from "react";
import "./App.css";

import IListItem from "./ListItem/IListItem";
import ListDisplay from "./ListDisplay/ListDisplay";
import InputText from "./InputText/InputText";

function App() {
  const [items, setItems] = useState<IListItem[]>([
    { product: "cheese", amount: "30g" },
  ]);

  return (
    <>
      <h1>Shopping List</h1>
      <div id="list-container">
        <ListDisplay items={items} />
        <InputText
          handleSubmit={(item: string) => {
            setItems([...items, { product: item, amount: "30g" }]);
          }}
        />
      </div>
    </>
  );
}

export default App;
