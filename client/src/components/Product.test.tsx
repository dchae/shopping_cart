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

  const heading = screen.getByRole("heading", {
    name: /Amazon Kindle E-reader/i,
  });
  expect(heading).toBeInTheDocument();
});
