import { fireEvent, render, screen } from "@testing-library/react";
import CollapsibleCategory from "./CollapsibleCategory";

const mockProps = {
  category: "dairy",
  items: [{ product: "cheese", amount: "50g" }],
};

describe("CollapsibleCategory", () => {
  it("renders headings", () => {
    expect(screen.getByText("dairy")).toBeInTheDocument();
  });
  it("has a heading which can be clicked", () => {
    fireEvent.click(screen.getByText("dairy"));
  });

  beforeEach(() => {
    render(
      <CollapsibleCategory
        category={mockProps.category}
        items={mockProps.items}
      />
    );
  });
});
