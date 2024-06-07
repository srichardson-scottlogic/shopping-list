import IListItem from "../../ListItem/IListItem";

const objectToMap = (obj: Map<string, IListItem[]>) => {
  return new Map<string, IListItem[]>(Object.entries(obj));
};

export const getListData = async () => {
  const response = await fetch("http://127.0.0.1:5000/shoppingList");
  const result = await response.json();

  return objectToMap(result);
};

export const addItemsDataToList = async (data: IListItem[]) => {
  const response = await fetch("http://127.0.0.1:5000/shoppingList", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();

  return objectToMap(result);
};

export const deleteItemFromList = async (data: IListItem[]) => {
  const response = await fetch("http://127.0.0.1:5000/shoppingList", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();

  return objectToMap(result);
};
