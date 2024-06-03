import "./autocompleteDropdown.css";

export default function AutocompleteDropdown(props: {
  onChange: (newValue: string) => void;
  value: string;
  items: string[];
  ariaLabel: string;
  placeholder: string;
}) {
  return (
    <>
      <input
        type="text"
        aria-label={props.ariaLabel}
        placeholder={props.placeholder}
        className="product-input"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
      {!!props.items.length && (
        <div className="dropdown-content">
          {props.items.map((item) => (
            <div key={item}>
              <button
                type="button"
                key={item}
                onClick={() => props.onChange(item)}
              >{`${item} `}</button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
