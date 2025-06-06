import { render, screen } from "@testing-library/react";
import ProductList from "./ProductList";

test("renders content", () => {
  const mockProducts = [
    {
      _id: "1",
      title: "Amazon Kindle E-reader",
      quantity: 5,
      price: 79.99,
    },
    {
      _id: "2",
      title: "Apple 10.5-Inch iPad Pro",
      quantity: 0,
      price: 649.99,
    },
    {
      _id: "3",
      title: "Yamaha Portable Keyboard",
      quantity: 2,
      price: 155.99,
    },
    {
      _id: "4",
      title: "Tinker, Tailor, Soldier, Spy - A John le Carre Novel",
      quantity: 12,
      price: 13.74,
    },
  ];

  const mockAddToCartHandler = vi.fn();
  const mockDeleteProductHandler = vi.fn();
  const mockUpdateProductHandler = vi.fn();
  render(
    <ProductList
      products={mockProducts}
      onAddToCart={mockAddToCartHandler}
      onDeleteProduct={mockDeleteProductHandler}
      onUpdateProduct={mockUpdateProductHandler}
    />,
  );

  const heading = screen.getByRole("heading", { name: /products/i });
  expect(heading).toBeInTheDocument();
});
