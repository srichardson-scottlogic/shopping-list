import IListItem from "../../ListItem/IListItem";

export const addCategoryDataForProduct = async (
  product: string,
  category: string,
) => {
  const data = {
    name: product,
    category: category,
  };
  await fetch("http://127.0.0.1:5000/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const getCategoryDataResponseForProduct = async (product: string) => {
  const response = await fetch("http://127.0.0.1:5000/products/" + product);
  const result = await response.json();
  return result;
};

export interface IDataItem {
  category: string;
}

export const getDataResponseForFilteredProducts = async (
  query: string,
): Promise<Map<string, IDataItem[]>> => {
  const response = await fetch(
    "http://127.0.0.1:5000/products/filter/" + query,
  );

  const result = await response.json();
  return result;
};
