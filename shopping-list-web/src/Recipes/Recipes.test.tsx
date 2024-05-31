import { render, screen } from "@testing-library/react";
import Recipes from "./Recipes";

describe("Recipes", () => {
  it("renders heading", () => {
    expect(screen.getByText("Recipes")).toBeInTheDocument();
  });

  //TODO: Add end to end type tests here

  beforeEach(() => {
    render(<Recipes />);
  });
});
