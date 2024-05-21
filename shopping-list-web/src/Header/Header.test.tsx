import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Header from "./Header";

const mockShoppingListClick = jest.fn().mockResolvedValue(undefined);
const mockRecipeClick = jest.fn().mockResolvedValue(undefined);

describe("Header", () => {
  it("renders headings", () => {
    expect(screen.getByText("Shopping List")).toBeInTheDocument();
    expect(screen.getByText("Recipes")).toBeInTheDocument();
  });
  it("has a Shopping List button which can be clicked", async () => {
    fireEvent.click(screen.getByText("Shopping List"));
    await waitFor(() => {
        expect(mockShoppingListClick).toHaveBeenCalled();
        expect(mockRecipeClick).not.toHaveBeenCalled();
      });
  });
  it("has a Recipe button which can be clicked", async () => {
    fireEvent.click(screen.getByText("Recipes"));
    await waitFor(() => {
      expect(mockRecipeClick).toHaveBeenCalled();
      expect(mockShoppingListClick).not.toHaveBeenCalled();
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
    render(
      <Header
        onShoppingListClick={mockShoppingListClick}
        onRecipesClick={mockRecipeClick}
      />
    );
  });
});
