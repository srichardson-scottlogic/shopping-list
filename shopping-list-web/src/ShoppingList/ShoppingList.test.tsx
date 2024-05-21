import { render, screen } from "@testing-library/react";
import ShoppingList from "./ShoppingList";

describe("ShoppingList", () => {
  it("renders heading", () => {
    expect(screen.getByText("Shopping List")).toBeInTheDocument();
  });

  //TODO: Add end to end type tests here

  beforeEach(() => {
    render(<ShoppingList />);
  });
});
