import { render, screen } from "@testing-library/react";
import CollapsibleCategory from "./CollapsibleCategory";

const mockProps = {
  category: "dairy",
  items: [{ product: "cheese", amount: "50g" }],
};

describe("CollapsibleCategory", () => {
  it("renders headings", () => {
    render(
      <CollapsibleCategory
        category={mockProps.category}
        items={mockProps.items}
      />
    );
    expect(screen.getByText("dairy")).toBeInTheDocument();
  });
});
