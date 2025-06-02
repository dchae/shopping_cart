import { createElement as ce } from "react";

const ProductListing = ({ products }) => {
  const children = [ce("h2", null, "Products"), ce(ProductList, { products })];
  return ce("div", { className: "product-listing" }, ...children);
};

const ProductList = ({ products }) => {
  const children = products.map((product) =>
    ce(Product, { ...product, key: product.id }),
  );
  return ce("ul", { className: "product-list" }, ...children);
};

const Product = (product) => {
  return ce("li", { className: "product" }, ce(ProductDetails, product));
};

const ProductDetails = ({ title, price, quantity }) => {
  const children = [
    ce("h3", null, title),
    ce("p", { className: "price" }, `$${price}`),
    ce("p", { className: "quantity" }, `${quantity} left in stock`),
    ce(ProductActions),
    ce(DeleteButton),
  ];
  return ce("div", { className: "product-details" }, ...children);
};

const ProductActions = () => {
  const children = [
    ce("button", { className: "add-to-cart" }, "Add to Cart"),
    ce("button", { className: "edit" }, "Edit"),
  ];
  return ce("div", { className: "actions product-actions" }, ...children);
};

const DeleteButton = () => {
  const children = [ce("span", null, "X")];
  return ce("button", { className: "delete-button" }, ...children);
};

const App = () => {
  const products = [
    {
      id: 1,
      title: "Amazon Kindle E-reader",
      quantity: 5,
      price: 79.99,
    },
    {
      id: 2,
      title: "Apple 10.5-Inch iPad Pro",
      quantity: 3,
      price: 649.99,
    },
    {
      id: 3,
      title: "Yamaha Portable Keyboard",
      quantity: 2,
      price: 155.99,
    },
    {
      id: 4,
      title: "Tinker, Tailor, Soldier, Spy - A John le Carre Novel",
      quantity: 12,
      price: 13.74,
    },
  ];
  return ce(ProductListing, { products });
};

export default App;
