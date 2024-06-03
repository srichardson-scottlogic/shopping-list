import { useState } from "react";
import {
  addCategoryDataForProduct,
  getCategoryDataResponseForProduct,
} from "../utilities/httpMethods/productMethods";
import InputText from "./InputText/InputText";
import InputCategory from "./InputCategory/InputCategory";

export default function AddItem(props: {
  postNewItemAndDisplayNewList: (
    category: string,
    currentProduct: string,
    currentAmount: string
  ) => Promise<any>;
}) {
  const [currentProduct, setCurrentProduct] = useState<string>("");
  const [currentAmount, setCurrentAmount] = useState<string>("");
  const [categoryFound, setCategoryFound] = useState(true);

  const handleItemSubmit = async () => {
    const category = await getCategoryDataForProduct(currentProduct);
    if (category) {
      await props.postNewItemAndDisplayNewList(
        category,
        currentProduct,
        currentAmount
      );
      setCurrentProduct("");
      setCurrentAmount("");
    }
  };

  const handleCategorySubmit = async (category: string) => {
    await addCategoryDataForProduct(currentProduct, category);
    setCategoryFound(true);
    await props.postNewItemAndDisplayNewList(
      category,
      currentProduct,
      currentAmount
    );
    setCurrentProduct("");
    setCurrentAmount("");
  };

  const getCategoryDataForProduct = async (product: string) => {
    try {
      const result = await getCategoryDataResponseForProduct(product);
      if (result.error === "Product not found") {
        setCategoryFound(false);
        return;
      }
      return result.category;
    } catch (error) {
      console.error("Error: ", error);
      return "miscellaneous"; //TODO: Improve this error handling
    }
  };

  return (
    <>
      {categoryFound && (
        <InputText
          currentProduct={currentProduct}
          currentAmount={currentAmount}
          setCurrentProduct={setCurrentProduct}
          setCurrentAmount={setCurrentAmount}
          handleSubmit={handleItemSubmit}
        />
      )}
      {!categoryFound && (
        <InputCategory
          product={currentProduct}
          handleSubmit={handleCategorySubmit}
        />
      )}
    </>
  );
}
