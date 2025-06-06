import { render, screen } from "@testing-library/react";
import Product from "./Product";

test("renders content", () => {
  const mockProduct = {
    _id: "1",
    title: "Amazon Kindle E-reader",
    quantity: 5,
    price: 79.99,
  };

  const mockAddToCartHandler = vi.fn();
  const mockDeleteProductHandler = vi.fn();
  const mockShowEditFormHandler = vi.fn();
  render(
    <Product
      product={mockProduct}
      onAddToCart={mockAddToCartHandler}
      onDeleteProduct={mockDeleteProductHandler}
      onShowEditForm={mockShowEditFormHandler}
    />,
  );

  const title = screen.getByRole("heading", {
    name: /amazon kindle e-reader/i,
  });
  expect(title).toBeInTheDocument();
  const quantity = screen.getByText(/5\s* left in stock/);
  expect(quantity).toBeInTheDocument();
  const price = screen.getByText(/\$\s*79\.99/);
  expect(price).toBeInTheDocument();
});
