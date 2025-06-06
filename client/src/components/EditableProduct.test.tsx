import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import EditableProduct from "./EditableProduct";

test("edit form is toggleable", async () => {
  const user = userEvent.setup();
  const mockProduct = {
    _id: "1",
    title: "Amazon Kindle E-reader",
    quantity: 5,
    price: 79.99,
  };

  const mockAddToCartHandler = vi.fn();
  const mockDeleteProductHandler = vi.fn();
  const mockUpdateProductHandler = vi.fn();
  render(
    <EditableProduct
      product={mockProduct}
      onAddToCart={mockAddToCartHandler}
      onDeleteProduct={mockDeleteProductHandler}
      onUpdateProduct={mockUpdateProductHandler}
    />,
  );

  const editFormToggleButton = screen.getByRole("button", {
    name: /edit/i,
  });

  expect(editFormToggleButton).toBeInTheDocument();
  await user.click(editFormToggleButton);
  expect(editFormToggleButton).toBeInTheDocument();

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

  await user.click(cancelButton);
  expect(cancelButton).not.toBeInTheDocument();

  expect(
    screen.getByRole("button", {
      name: /edit/i,
    }),
  ).toBeInTheDocument();

  expect(nameInput).not.toBeInTheDocument();
  expect(priceInput).not.toBeInTheDocument();
  expect(quantityInput).not.toBeInTheDocument();
});
