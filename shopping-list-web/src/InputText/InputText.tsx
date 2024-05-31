import { Dispatch, useState, ChangeEvent, useEffect } from "react";
import IListItem from "../ListItem/IListItem";
import "./InputText.css"
import { getDataResponseForFilteredProducts } from "../utilities/httpMethods/productMethods";

export default function InputText(props: {
  currentProduct: string;
  currentAmount: string
  setCurrentProduct: Dispatch<React.SetStateAction<string>>;
  setCurrentAmount: Dispatch<React.SetStateAction<string>>;
  handleSubmit: () => Promise<void> | void;
}) {

  const [items, setItems] = useState<Map<string, IListItem[]>>(
    new Map<string, IListItem[]>()
  );

  const handleProductInput = (e: ChangeEvent<HTMLInputElement>) => {
    const current_value = e.target.value
    props.setCurrentProduct(current_value)
    
  }

  const handleAutoCompleteClick = (item: string) => {
    props.setCurrentProduct(item)
  }

  useEffect(() => {
    const timeOutId = setTimeout(() => getDataResponseForFilteredProducts(props.currentProduct).then((res) => setItems(res)), 500);
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
        <input
          type="text"
          aria-label="productInput"
          placeholder="product"
          className="product-input"
          value={props.currentProduct}
          onChange={handleProductInput}
        />
        <input
          type="text"
          aria-label="amountInput"
          placeholder="amount"
          value={props.currentAmount}
          onChange={(e) => props.setCurrentAmount(e.target.value)}
        />
        {!!Object.keys(items).length &&
          <div className="dropdown-content">
            {Object.keys(items).map((i) => (
              <div key={i}>
                <button type="button" key={i} onClick={() => handleAutoCompleteClick(i)}>{`${i} `}</button>
              </div>
            ))}
          </div>
        }
        <button type="submit">Add item</button>
      </form>
    </>
  );
}
