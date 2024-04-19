import { useState } from "react";

export default function InputCategory(props: {
  product: string;
  handleSubmit: (category: string) => void;
}) {
  const [category, setCategory] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        props.handleSubmit(category);
      }}
    >
      <p>
        Please enter where in the supermarket you would find {props.product}
      </p>
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button type="submit">Add category</button>
    </form>
  );
}
