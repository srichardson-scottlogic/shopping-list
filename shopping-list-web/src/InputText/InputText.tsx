import { useState } from "react";

export default function InputText(props) {
  //TODO: What type should this props be?
  const [product, setProduct] = useState("");
  const [amount, setAmount] = useState("");
  return (
    <form
      onSubmit={(e) => {
        console.log(e);
        e.preventDefault();
        props.handleSubmit(product, amount);
        setProduct("");
        setAmount("");
      }}
    >
      <input
        type="text"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
      />
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button type="submit">Add item</button>
    </form>
  );
}
