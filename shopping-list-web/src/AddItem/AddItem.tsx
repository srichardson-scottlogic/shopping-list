import { Dispatch, useState } from "react";
import {
  addCategoryDataForProduct,
  getCategoryDataResponseForProduct,
} from "../utilities/httpMethods/productMethods";
import InputText from "./InputText/InputText";
import InputCategory from "./InputCategory/InputCategory";

export default function AddItem(props: {
  currentProduct: string;
  setCurrentProduct: Dispatch<React.SetStateAction<string>>;
  currentAmount: string;
  setCurrentAmount: Dispatch<React.SetStateAction<string>>;
  handleItemSubmit: ((category: string) => Promise<void>) | (() => void);
}) {
  const [categoryFound, setCategoryFound] = useState(true);

  const handleItemSubmit = async () => {
    const category = await getCategoryDataForProduct(props.currentProduct);
    if (category) {
      await props.handleItemSubmit(category);
      props.setCurrentProduct("");
      props.setCurrentAmount("");
    }
  };

  const handleCategorySubmit = async (category: string) => {
    await addCategoryDataForProduct(props.currentProduct, category);
    setCategoryFound(true);
    await props.handleItemSubmit(category);
    props.setCurrentProduct("");
    props.setCurrentAmount("");
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
          currentProduct={props.currentProduct}
          currentAmount={props.currentAmount}
          setCurrentProduct={props.setCurrentProduct}
          setCurrentAmount={props.setCurrentAmount}
          handleSubmit={handleItemSubmit}
        />
      )}
      {!categoryFound && (
        <InputCategory
          product={props.currentProduct}
          handleSubmit={handleCategorySubmit}
        />
      )}
    </>
  );
}
