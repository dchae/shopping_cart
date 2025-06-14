import { render, screen, within, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import apiService from "./services/apiService";
import App from "./App";
import type { Product, CartItem } from "./types";

vi.mock("./services/apiService");

afterEach(() => {
  vi.resetAllMocks();
});

const mockedApiService = vi.mocked(apiService, true);
const mockProducts: Array<Product> = [
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

const mockCartItems: Array<CartItem> = [
  {
    _id: "a1",
    productId: "1",
    title: "Amazon Kindle E-reader",
    quantity: 1,
    price: 79.99,
  },
  {
    _id: "a2",
    productId: "2",
    title: "Apple 10.5-Inch iPad Pro",
    quantity: 3,
    price: 649.99,
  },
];

test("renders products", async () => {
  mockedApiService.getProducts.mockResolvedValue(mockProducts);
  mockedApiService.getCartItems.mockResolvedValue([]);

  render(<App />);
  const title1 = await screen.findByRole("heading", {
    name: /amazon kindle e-reader/i,
  });
  expect(title1).toBeInTheDocument();

  const productDetails1 = title1.parentElement;
  const quantity1 = within(productDetails1!).getByText(/5\s* left in stock/);
  expect(quantity1).toBeInTheDocument();
  const price1 = within(productDetails1!).getByText(/\$\s*79\.99/);
  expect(price1).toBeInTheDocument();
  expect(mockedApiService.getProducts).toHaveBeenCalledOnce();
});

test("renders cart items", async () => {
  mockedApiService.getProducts.mockResolvedValue(mockProducts);
  mockedApiService.getCartItems.mockResolvedValue(mockCartItems);

  render(<App />);
  const cartElement = (
    await screen.findByRole("heading", {
      name: /your cart/i,
    })
  ).parentElement!;

  const cartTable = within(cartElement).getByRole("table");
  const row1 = within(cartTable).getByRole("row", {
    name: /amazon kindle e-reader/i,
  });
  expect(row1).toBeInTheDocument();

  const quantity1 = within(row1).getByText(/1/);
  expect(quantity1).toBeInTheDocument();

  const price1 = within(row1).getByText(/\$\s*79\.99/);
  expect(price1).toBeInTheDocument();

  const row2 = within(cartTable).getByRole("row", {
    name: /Apple 10\.5-Inch iPad Pro/i,
  });
  expect(row2).toBeInTheDocument();

  const quantity2 = within(row2).getByText(/3/);
  expect(quantity2).toBeInTheDocument();

  const price2 = within(row2).getByText(/\$\s*649\.99/);
  expect(price2).toBeInTheDocument();

  expect(mockedApiService.getCartItems).toHaveBeenCalledOnce();
});

test("updating product closes edit form", async () => {
  const user = userEvent.setup();
  mockedApiService.getProducts.mockResolvedValue(mockProducts);
  mockedApiService.getCartItems.mockResolvedValue([]);
  const updatedProduct = {
    _id: "1",
    title: "Amazon Kindle E-reader",
    quantity: 59,
    price: 79.99,
  };
  mockedApiService.updateProduct.mockResolvedValue(updatedProduct);

  render(<App />);

  const heading1 = await screen.findByRole("heading", {
    name: /amazon kindle e-reader/i,
  });
  const productListing1 = heading1.parentElement!;
  const product1 = productListing1.parentElement!;

  const editButton1 = await within(product1).findByRole("button", {
    name: /edit/i,
  });
  expect(editButton1).toBeInTheDocument();
  await user.click(editButton1);

  const nameInput = await screen.findByRole("textbox", {
    name: /product name/i,
  });
  expect(nameInput).toBeInTheDocument();
  expect(nameInput).toHaveDisplayValue("Amazon Kindle E-reader");

  const priceInput = screen.getByRole("spinbutton", { name: /price/i });
  expect(priceInput).toBeInTheDocument();
  expect(priceInput).toHaveDisplayValue("79.99");

  const quantityInput = screen.getByRole("spinbutton", { name: /quantity/i });
  expect(quantityInput).toBeInTheDocument();
  expect(quantityInput).toHaveDisplayValue("5");

  await user.type(quantityInput, "9");
  expect(quantityInput).toHaveDisplayValue("59");

  const updateButton = within(product1).getByRole("button", {
    name: /update/i,
  });
  await user.click(updateButton);
  expect(updateButton).not.toBeInTheDocument();
  expect(nameInput).not.toBeInTheDocument();
  expect(priceInput).not.toBeInTheDocument();
  expect(quantityInput).not.toBeInTheDocument();

  expect(mockedApiService.updateProduct).toHaveBeenCalledOnce();
});

test("Adding a product closes add product form and product appears", async () => {
  const user = userEvent.setup();
  mockedApiService.getProducts.mockResolvedValue(mockProducts);
  mockedApiService.getCartItems.mockResolvedValue([]);
  const newProduct = {
    _id: "5",
    title: "Srdjan's socks",
    quantity: 2,
    price: 95.5,
  };
  mockedApiService.createProduct.mockResolvedValue(newProduct);

  render(<App />);

  const showAddFormButton = screen.getByRole("button", {
    name: /add a product/i,
  });
  await user.click(showAddFormButton);

  const nameInput = await screen.findByRole("textbox", {
    name: /product name/i,
  });
  await user.type(nameInput, newProduct.title);
  expect(nameInput).toHaveDisplayValue(newProduct.title);

  const priceInput = screen.getByRole("spinbutton", { name: /price/i });
  await user.type(priceInput, newProduct.price.toString());
  expect(priceInput).toHaveDisplayValue("95.5");

  const quantityInput = screen.getByRole("spinbutton", { name: /quantity/i });
  await user.type(quantityInput, newProduct.quantity.toString());
  expect(quantityInput).toHaveDisplayValue("2");

  const submitButton = screen.getByRole("button", { name: /^add$/i });
  await user.click(submitButton);

  expect(mockedApiService.createProduct).toHaveBeenCalledOnce();

  const title = await screen.findByRole("heading", {
    name: /srdjan's socks/i,
  });
  expect(title).toBeInTheDocument();

  const productDetails = title.parentElement;
  const quantity = within(productDetails!).getByText(/2\s* left in stock/);
  expect(quantity).toBeInTheDocument();
  const price = within(productDetails!).getByText(/\$\s*95\.50/);
  expect(price).toBeInTheDocument();
});

test("Deleting a product removes it", async () => {
  const user = userEvent.setup();

  mockedApiService.getProducts.mockResolvedValue(mockProducts);
  mockedApiService.getCartItems.mockResolvedValue([]);
  mockedApiService.deleteProduct.mockResolvedValue();

  render(<App />);

  const title1 = await screen.findByRole("heading", {
    name: /amazon kindle e-reader/i,
  });
  const product1 = title1.parentElement!.parentElement!;
  const deleteButton = within(product1).getByRole("button", { name: "X" });
  await user.click(deleteButton);

  await waitFor(() => {
    const titleRemoved = screen.queryByRole("heading", {
      name: /amazon kindle e-reader/i,
    });

    expect(titleRemoved).toBeNull();
  });

  expect(mockedApiService.deleteProduct).toHaveBeenCalledOnce();
});

test("Adding an item to cart creates cart item", async () => {
  const user = userEvent.setup();

  const updatedProduct = {
    _id: "1",
    title: "Amazon Kindle E-reader",
    quantity: 4,
    price: 79.99,
  };

  const newCartItem = {
    _id: "a1",
    productId: "1",
    title: "Amazon Kindle E-reader",
    quantity: 1,
    price: 79.99,
  };

  mockedApiService.getProducts.mockResolvedValue(mockProducts);
  mockedApiService.getCartItems.mockResolvedValue([]);
  mockedApiService.addToCart.mockResolvedValue([updatedProduct, newCartItem]);

  render(<App />);

  const cartElement = (
    await screen.findByRole("heading", {
      name: /your cart/i,
    })
  ).parentElement!;

  await waitFor(() => {
    const nullCartItem = within(cartElement).queryByText(
      /amazon kindle e-reader/i,
    );
    expect(nullCartItem).toBeNull();
  });

  const title1 = await screen.findByRole("heading", {
    name: /amazon kindle e-reader/i,
  });
  const product1 = title1.parentElement!.parentElement!;
  let productQuantity = within(product1).getByText(/5\s* left in stock/);
  expect(productQuantity).toBeInTheDocument();

  const addToCartButton = within(product1).getByRole("button", {
    name: /add to cart/i,
  });
  await user.click(addToCartButton);

  const cartTable = await within(cartElement).findByRole("table");
  const cartRow = within(cartTable).getByRole("row", {
    name: /amazon kindle e-reader/i,
  });
  expect(cartRow).toBeInTheDocument();

  const cartQuantity = within(cartRow).getByText(/1/);
  expect(cartQuantity).toBeInTheDocument();

  const cartPrice = within(cartRow).getByText(/\$\s*79\.99/);
  expect(cartPrice).toBeInTheDocument();

  productQuantity = within(product1).getByText(/4\s* left in stock/);
  expect(productQuantity).toBeInTheDocument();

  expect(mockedApiService.addToCart).toHaveBeenCalledOnce();
});

test("Checkout removes cart items", async () => {
  const user = userEvent.setup();

  mockedApiService.getProducts.mockResolvedValue(mockProducts);
  mockedApiService.getCartItems.mockResolvedValue(mockCartItems);

  render(<App />);

  const cartElement = (
    await screen.findByRole("heading", {
      name: /your cart/i,
    })
  ).parentElement!;

  const cartTable = await within(cartElement).findByRole("table");
  const cartRow = within(cartTable).getByRole("row", {
    name: /amazon kindle e-reader/i,
  });
  expect(cartRow).toBeInTheDocument();

  const checkoutCartButton = within(cartElement).getByRole("button", {
    name: /checkout/i,
  });
  await user.click(checkoutCartButton);

  await waitFor(() => {
    const nullCartTable = within(cartElement).queryByRole("table");
    expect(nullCartTable).toBeNull();
  });

  const nullCartItem = within(cartElement).queryByText(
    /amazon kindle e-reader/i,
  );
  expect(nullCartItem).toBeNull();

  // const emptyMsg = within(cartElement).getByText(/your cart is empty/i);
  const emptyMsg = await screen.findByText(/your cart is empty/i);
  expect(emptyMsg).toBeInTheDocument();

  expect(mockedApiService.checkoutCart).toHaveBeenCalledOnce();
});
