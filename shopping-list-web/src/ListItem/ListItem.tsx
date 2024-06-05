import { useRef, useState } from "react";
import ListItemInterface from "./IListItem";
import "./ListItem.css";

export default function ListItem(props: ListItemInterface) {

  const dropdownMenu = useRef(null)
  const [openSlide, setopenSlide] = useState(false);

  const closeOpenMenus = (e: MouseEvent)=>{
    if(openSlide && !dropdownMenu.current?.contains(e.target)){
      setopenSlide(false)
    }
}

  document.addEventListener('mousedown',closeOpenMenus)

  return (
    <>
    <div className="list-item" style={{backgroundColor:props.backgroundColor}}>
      <div>
        <input type="checkbox" id={props.product} name={props.product} />
        <label htmlFor={props.product}>
          {props.product + " : " + props.amount}
        </label>
      </div>
      <button className="modify-button" onClick={_ => setopenSlide(!openSlide)}>Modify</button>

    </div>
    <div style={{position: "relative", display:"flex", justifyContent: "flex-end"}}>
      {openSlide && <div className="dropdown-content2" ref={dropdownMenu}>
          <button
            style={{ color: "red" }}
            onClick={props.modifyFunctions.delete}
            type="button"
          >
            Delete
          </button>
      </div>}
      </div>
    </>
  );
}
