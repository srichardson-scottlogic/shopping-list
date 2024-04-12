import { useState } from "react";

export default function InputText(props) {
  //TODO: What type should this props be?
  const [value, setValue] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        props.handleSubmit(value);
        setValue("");
      }}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
}
