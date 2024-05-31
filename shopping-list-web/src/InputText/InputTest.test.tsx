import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import InputText from "./InputText";

const mockCurrentProduct = ""
const mockSetCurrentProduct = jest.fn().mockResolvedValue(undefined);
const mockSetCurrentAmount = jest.fn().mockResolvedValue(undefined);
const mockHandleSubmit = jest.fn().mockResolvedValue(undefined);

describe("InputText", () => {
  it("renders with two input fields and a submit button", () => {
    expect(screen.getByRole("textbox", { name: /productInput/i })).toHaveValue(
      ""
    );
    expect(screen.getByRole("textbox", { name: /amountInput/i })).toHaveValue(
      ""
    );
    expect(screen.getByRole("button")).toHaveTextContent(/Add item/i);
  });
  it("allows for the input of a product", async () => {
    fireEvent.change(screen.getByRole("textbox", { name: /productInput/i }), {
      target: { value: "cake" },
    });
    expect(screen.getByRole("textbox", { name: /productInput/i })).toHaveValue(
      "cake"
    );
  });
  it("allows for the input of an amount", async () => {
    fireEvent.change(screen.getByRole("textbox", { name: /amountInput/i }), {
      target: { value: "30g" },
    });
    expect(screen.getByRole("textbox", { name: /amountInput/i })).toHaveValue(
      "30g"
    );
  });

  it("handles submit", async () => {
    fireEvent.click(screen.getByRole("button", { name: /Add item/i }));
    await waitFor(() => expect(mockHandleSubmit).toHaveBeenCalled());
  });

  beforeEach(() => {
    render(
      <InputText
        currentProduct={mockCurrentProduct}
        setCurrentProduct={mockSetCurrentProduct}
        setCurrentAmount={mockSetCurrentAmount}
        handleSubmit={mockHandleSubmit}
      />
    );
    jest.clearAllMocks();
  });
});
