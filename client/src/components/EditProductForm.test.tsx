import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import EditProductForm from "./EditProductForm";

test("form renders content", () => {
  const mockProduct = {
    _id: "1",
    title: "Amazon Kindle E-reader",
    quantity: 5,
    price: 79.99,
  };

  const mockSubmitHandler = vi.fn();
  const onHideHandler = vi.fn();
  render(
    <EditProductForm
      product={mockProduct}
      onSubmit={mockSubmitHandler}
      hide={onHideHandler}
    />,
  );

  const nameInput = screen.getByRole("textbox", { name: /product name/i });
  expect(nameInput).toBeInTheDocument();
  expect(nameInput).toHaveDisplayValue("Amazon Kindle E-reader");

  const priceInput = screen.getByRole("spinbutton", { name: /price/i });
  expect(priceInput).toBeInTheDocument();
  expect(priceInput).toHaveDisplayValue("79.99");

  const quantityInput = screen.getByRole("spinbutton", { name: /quantity/i });
  expect(quantityInput).toBeInTheDocument();
  expect(quantityInput).toHaveDisplayValue("5");

  const cancelButton = screen.getByRole("button", { name: /cancel/i });
  expect(cancelButton).toBeInTheDocument();
});

test("cancel button calls hide callback", async () => {
  const user = userEvent.setup();

  const mockProduct = {
    _id: "1",
    title: "Amazon Kindle E-reader",
    quantity: 5,
    price: 79.99,
  };
  const mockSubmitHandler = vi.fn();
  const onHideHandler = vi.fn();
  render(
    <EditProductForm
      product={mockProduct}
      onSubmit={mockSubmitHandler}
      hide={onHideHandler}
    />,
  );

  const cancelButton = screen.getByRole("button", { name: /cancel/i });
  await user.click(cancelButton);
  expect(onHideHandler).toHaveBeenCalledOnce();
});

test("input fields are updated", async () => {
  const user = userEvent.setup();

  const mockProduct = {
    _id: "1",
    title: "Amazon Kindle E-reader",
    quantity: 5,
    price: 79.99,
  };
  const mockSubmitHandler = vi.fn();
  const onHideHandler = vi.fn();
  render(
    <EditProductForm
      product={mockProduct}
      onSubmit={mockSubmitHandler}
      hide={onHideHandler}
    />,
  );

  const nameInput = screen.getByRole("textbox", { name: /product name/i });
  await user.clear(nameInput);
  expect(nameInput).toHaveDisplayValue("");
  await user.type(nameInput, "Product Name");
  expect(nameInput).toHaveDisplayValue("Product Name");

  const priceInput = screen.getByRole("spinbutton", { name: /price/i });
  await user.clear(priceInput);
  expect(priceInput).toHaveDisplayValue("");
  await user.type(priceInput, "10.99");
  expect(priceInput).toHaveDisplayValue("10.99");

  const quantityInput = screen.getByRole("spinbutton", { name: /quantity/i });
  await user.clear(quantityInput);
  expect(quantityInput).toHaveDisplayValue("");
  await user.type(quantityInput, "8");
  expect(quantityInput).toHaveDisplayValue("8");

  const submitButton = screen.getByRole("button", { name: /update/i });
  await user.click(submitButton);

  expect(mockSubmitHandler).toHaveBeenCalledOnce();
});
