import { fireEvent, render, screen } from "@testing-library/react";
import CollapsibleCategory from "./CollapsibleRecipe";

const mockProps = {
  recipe: "cheesecake",
  numberOfPortions: 2,
  items: [
    { product: "cheese", amount: "50g" },
    { product: "cake", amount: "500g" },
  ],
};

describe("CollapsibleRecipe", () => {
  it("renders headings", () => {
    expect(screen.getByText("cheesecake")).toBeInTheDocument();
  });
  it("has a heading which can be clicked", () => {
    fireEvent.click(screen.getByText("cheesecake"));
  });

  beforeEach(() => {
    render(
      <CollapsibleCategory
        recipe={mockProps.recipe}
        numberOfPortions={mockProps.numberOfPortions}
        items={mockProps.items}
      />
    );
  });
});
