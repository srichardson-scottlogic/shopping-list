import IListItem from "../../ListItem/IListItem";

const objectToMap = (obj: Map<string, IListItem[]>) => {
  return new Map<string, IListItem[]>(Object.entries(obj));
};

export const getListData = async () => {
  const response = await fetch("http://127.0.0.1:5000/shoppingList");
  const result = await response.json();

  const objectToMap = (obj: Map<string, IListItem[]>) => {
    return new Map<string, IListItem[]>(Object.entries(obj));
  };
  return objectToMap(result);
};

export const addItemDataToList = async (
  category: string,
  product: string,
  amount: string
) => {
  const data = [
    {
      category: category,
      item: {
        product: product,
        amount: amount,
      },
    },
  ];
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
