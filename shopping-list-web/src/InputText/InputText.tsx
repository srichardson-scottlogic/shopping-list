import { Dispatch, useState, useEffect } from "react";
import { IDataItem, getDataResponseForFilteredProducts } from "../utilities/httpMethods/productMethods";
import AutocompleteDropdown from "../common/autocompleteDropdown";

export default function InputText(props: {
  currentProduct: string;
  currentAmount: string;
  setCurrentProduct: Dispatch<React.SetStateAction<string>>;
  setCurrentAmount: Dispatch<React.SetStateAction<string>>;
  handleSubmit: () => Promise<void> | void;
}) {
  const [items, setItems] = useState<Map<string, IDataItem[]>>(
    new Map<string, IDataItem[]>(),
  );

  useEffect(() => {
    const timeOutId = setTimeout(
      () =>
        getDataResponseForFilteredProducts(props.currentProduct).then((res) =>
          setItems(res),
        ),
      500,
    );
    return () => clearTimeout(timeOutId);
  }, [props.currentProduct]);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.handleSubmit();
        }}
      >
        <AutocompleteDropdown
          ariaLabel="productInput"
          placeholder="product"
          value={props.currentProduct}
          onChange={props.setCurrentProduct}
          items={Object.keys(items)}
        />
        <input
          type="text"
          aria-label="amountInput"
          placeholder="amount"
          value={props.currentAmount}
          onChange={(e) => props.setCurrentAmount(e.target.value)}
        />
        <button type="submit">Add item</button>
      </form>
    </>
  );
}
