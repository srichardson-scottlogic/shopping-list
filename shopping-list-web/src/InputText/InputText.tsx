import { Dispatch } from "react";

export default function InputText(props: {
  setCurrentProduct: Dispatch<React.SetStateAction<string>>;
  setCurrentAmount: Dispatch<React.SetStateAction<string>>;
  handleSubmit: () => Promise<void>;
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        props.handleSubmit();
      }}
    >
      <input
        type="text"
        aria-label="productInput"
        onChange={(e) => props.setCurrentProduct(e.target.value)}
      />
      <input
        type="text"
        aria-label="amountInput"
        onChange={(e) => props.setCurrentAmount(e.target.value)}
      />
      <button type="submit">Add item</button>
    </form>
  );
}
