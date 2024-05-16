import { fireEvent, render, screen } from "@testing-library/react";
import ListItem from "./ListItem";

describe("ListItem", () => {
  it("displays the product and amount with a checkbox", () => {
    expect(screen.getByText("cheese : 30g")).toBeInTheDocument();
  });

  it("allows the checkbox to be clicked", () => {
    fireEvent.click(screen.getByRole("checkbox", { name: /cheese/i }));
  });

  beforeEach(() => {
    render(<ListItem product={"cheese"} amount={"30g"} />);
  });
});
