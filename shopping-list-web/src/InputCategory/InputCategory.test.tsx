import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import InputCategory from "./InputCategory";

const mockHandleSubmit = jest.fn().mockResolvedValue(undefined);

describe("InputCategory", () => {
  it("renders question", () => {
    expect(
      screen.getByText(
        "Please enter where in the supermarket you would find cake",
      ),
    ).toBeInTheDocument();
  });
  it("allows for the input of a category", async () => {
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "bakery" },
    });
    expect(screen.getByRole("textbox")).toHaveValue("bakery");
  });

  it("handles submit when category entered", async () => {
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "bakery" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Add category/i }));
    await waitFor(() =>
      expect(mockHandleSubmit).toHaveBeenCalledWith("bakery"),
    );
  });

  beforeEach(() => {
    render(<InputCategory product={"cake"} handleSubmit={mockHandleSubmit} />);
    jest.clearAllMocks();
  });
});
