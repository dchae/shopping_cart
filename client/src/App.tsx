import { useState, useEffect } from "react";
import { getProducts } from "./services/apiService";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import AddProductForm from "./components/AddProductForm";
import type {
  Product as ProductType,
  CartItem as CartItemType,
  NewProduct as NewProductType,
} from "./types";

const mockCart: Array<CartItemType> = [
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

function App() {
  const [products, setProducts] = useState<Array<ProductType>>([]);
  const [cartItems, setCartItems] = useState<Array<CartItemType>>(mockCart);
  const [showAddProductForm, setShowAddProductForm] = useState<boolean>(false);

  useEffect(() => {
    getProducts().then((products) => {
      setProducts(products);
    });
  }, []);

  const addToCart = (newItem: CartItemType) => {
    setCartItems((items) => {
      if (items.some((item) => item._id === newItem._id)) {
        return items.map((item) =>
          item._id === newItem._id
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item,
        );
      } else {
        return [...items, newItem];
      }
    });
  };

  const addProduct = (data: NewProductType) => {
    const id = String(1 + Math.max(...products.map((p) => Number(p._id))));
    const newProduct = { ...data, _id: id };
    setProducts([...products, newProduct]);
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter((p) => p._id !== id));
  };

  return (
    <>
      <header>
        <h1>The Shop!</h1>
        <Cart items={cartItems} />
      </header>
      <main>
        <ProductList
          products={products}
          addToCart={addToCart}
          deleteProduct={deleteProduct}
        />
        {showAddProductForm ? (
          <AddProductForm
            addProduct={addProduct}
            hideForm={() => setShowAddProductForm(false)}
          />
        ) : (
          <p>
            <button
              className="add-product-button"
              onClick={() => setShowAddProductForm(true)}
            >
              Add A Product
            </button>
          </p>
        )}
      </main>
    </>
  );
}

export default App;
