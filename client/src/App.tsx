import { useState, useEffect } from "react";
import apiService from "./services/apiService";
import utils from "./utils";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import AddProductForm from "./components/AddProductForm";
import type {
  Product as ProductType,
  CartItem as CartItemType,
  NewProduct as NewProductType,
} from "./types";

function App() {
  const [products, setProducts] = useState<Array<ProductType>>([]);
  const [cartItems, setCartItems] = useState<Array<CartItemType>>(
    utils.getCartItems,
  );
  const [showAddProductForm, setShowAddProductForm] = useState<boolean>(false);

  useEffect(() => {
    apiService.getProducts().then((products) => {
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

  const addProductButton = (
    <p>
      <button
        className="add-product-button"
        onClick={() => setShowAddProductForm(true)}
      >
        Add A Product
      </button>
    </p>
  );

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
          addProductButton
        )}
      </main>
    </>
  );
}

export default App;
