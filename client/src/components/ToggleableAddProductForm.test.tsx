import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import ToggleableAddProductForm from "./ToggleableAddProductForm";

test("form is toggleable", async () => {
  const mockSubmitHandler = vi.fn();
  render(<ToggleableAddProductForm onSubmit={mockSubmitHandler} />);

  expect(
    screen.queryByRole("textbox", { name: /product name/i }),
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole("spinbutton", { name: /price/i }),
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole("spinbutton", { name: /quantity/i }),
  ).not.toBeInTheDocument();

  const user = userEvent.setup();

  const addProductButton = screen.getByRole("button", {
    name: /add a product/i,
  });
  expect(addProductButton).toBeInTheDocument();

  await user.click(addProductButton);
  expect(addProductButton).not.toBeInTheDocument();

  const nameInput = screen.getByRole("textbox", { name: /product name/i });
  const priceInput = screen.getByRole("spinbutton", { name: /price/i });
  const quantityInput = screen.getByRole("spinbutton", { name: /quantity/i });
  expect(nameInput).toBeInTheDocument();
  expect(priceInput).toBeInTheDocument();
  expect(quantityInput).toBeInTheDocument();

  const cancelButton = screen.getByRole("button", { name: /cancel/i });
  expect(cancelButton).toBeInTheDocument();

  await user.click(cancelButton);
  expect(cancelButton).not.toBeInTheDocument();
  expect(nameInput).not.toBeInTheDocument();
  expect(priceInput).not.toBeInTheDocument();
  expect(quantityInput).not.toBeInTheDocument();
});

test("input fields are updated", async () => {
  const mockSubmitHandler = vi.fn();
  render(<ToggleableAddProductForm onSubmit={mockSubmitHandler} />);

  const user = userEvent.setup();
  const addProductButton = screen.getByRole("button", {
    name: /add a product/i,
  });
  await user.click(addProductButton);

  const nameInput = screen.getByRole("textbox", { name: /product name/i });
  await user.type(nameInput, "Product Name");
  expect(nameInput).toHaveDisplayValue("Product Name");

  const priceInput = screen.getByRole("spinbutton", { name: /price/i });
  await user.type(priceInput, "10.99");
  expect(priceInput).toHaveDisplayValue("10.99");

  const quantityInput = screen.getByRole("spinbutton", { name: /quantity/i });
  await user.type(quantityInput, "8");
  expect(quantityInput).toHaveDisplayValue("8");

  const submitButton = screen.getByRole("button", { name: /Add/i });
  await user.click(submitButton);

  expect(mockSubmitHandler).toHaveBeenCalledOnce();
});
