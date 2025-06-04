import { useState, useEffect } from "react";
import apiService from "./services/apiService";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import AddProductForm from "./components/AddProductForm";
import type {
  Product as ProductType,
  CartItem as CartItemType,
  NewProduct as NewProductType,
} from "./types";

const App = () => {
  const [products, setProducts] = useState<Array<ProductType>>([]);
  const [cartItems, setCartItems] = useState<Array<CartItemType>>([]);
  const [showAddProductForm, setShowAddProductForm] = useState<boolean>(false);

  const handleAddToCart = async (productId: string) => {
    await apiService.addToCart(productId);
    setProducts(await apiService.getProducts());
    setCartItems(await apiService.getCartItems());
  };

  const handleAddProduct = async (
    data: NewProductType,
    callback?: () => void,
  ) => {
    try {
      // TODO: optimise this so no need for another fetch

      await apiService.createProduct(data);
      setProducts(await apiService.getProducts());

      if (callback) callback();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await apiService.deleteProduct(id);
      setProducts(products.filter((p) => p._id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateProduct = async (
    id: string,
    data: NewProductType,
    callback?: () => void,
  ) => {
    try {
      const updatedProduct = await apiService.updateProduct(id, data);
      setProducts((products) => {
        return products.map((product) =>
          product._id === id ? updatedProduct : product,
        );
      });

      if (callback) callback();
    } catch (e) {
      console.error(e);
    }
  };

  const handleCheckoutCart = async () => {
    try {
      await apiService.checkoutCart();
      setCartItems([]);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    (async () => {
      setProducts(await apiService.getProducts());
      setCartItems(await apiService.getCartItems());
    })();
  }, []);

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
        <Cart items={cartItems} onCheckout={handleCheckoutCart} />
      </header>
      <main>
        <ProductList
          products={products}
          onAddToCart={handleAddToCart}
          onDeleteProduct={handleDeleteProduct}
          onUpdateProduct={handleUpdateProduct}
        />
        {showAddProductForm ? (
          <AddProductForm
            onSubmit={handleAddProduct}
            hide={() => setShowAddProductForm(false)}
          />
        ) : (
          addProductButton
        )}
      </main>
    </>
  );
};

export default App;
