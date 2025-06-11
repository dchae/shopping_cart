import { useEffect, useReducer, useContext } from "react";
import apiService from "./services/apiService";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import ToggleableAddProductForm from "./components/ToggleableAddProductForm";
import { ProductAction, productsReducer } from "./reducers/productsReducer";
import { CartAction, cartReducer } from "./reducers/cartReducer";
import type { NewProduct as NewProductType } from "./types";
import { ThemeContext } from "./context/ThemeContext";
import { LocaleContext } from "./context/LocaleContext";

const App = () => {
  const [products, productDispatch] = useReducer(productsReducer, []);
  const [cartItems, cartDispatch] = useReducer(cartReducer, []);
  const theme = useContext(ThemeContext);
  const locale = useContext(LocaleContext);

  const handleAddToCart = async (productId: string, callback?: () => void) => {
    try {
      const [updatedProduct, updatedCartItem] =
        await apiService.addToCart(productId);

      productDispatch(ProductAction.UpdateProduct(updatedProduct));
      cartDispatch(CartAction.AddToCart(updatedCartItem));

      if (callback) callback();
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddProduct = async (
    data: NewProductType,
    callback?: () => void,
  ) => {
    try {
      const newProduct = await apiService.createProduct(data);
      productDispatch(ProductAction.AddProduct(newProduct));

      if (callback) callback();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await apiService.deleteProduct(id);
      productDispatch(ProductAction.DeleteProduct(id));
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
      productDispatch(ProductAction.UpdateProduct(updatedProduct));

      if (callback) callback();
    } catch (e) {
      console.error(e);
    }
  };

  const handleCheckoutCart = async () => {
    try {
      await apiService.checkoutCart();
      cartDispatch(CartAction.Checkout());
    } catch (e) {
      console.error(e);
    }
  };

  const handleLocaleToggleClick = () => {
    locale.setCode((code) => (code === "USD" ? "EUR" : "USD"));
  };

  useEffect(() => {
    (async () => {
      const products = await apiService.getProducts();
      productDispatch(ProductAction.SetProducts(products));
      const cartItems = await apiService.getCartItems();
      cartDispatch(CartAction.SetCartItems(cartItems));
    })();
  }, []);

  useEffect(() => {
    document.body.className = "--theme-" + theme.options.mode;
  }, [theme]);

  return (
    <>
      <header>
        <h1>The Shop!</h1>
        <Cart items={cartItems} onCheckout={handleCheckoutCart} />
      </header>
      <main>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button onClick={theme.toggleMode}>
            {theme.options.mode === "light" ? "☀️" : "🌙"}{" "}
          </button>
          <button onClick={handleLocaleToggleClick}>
            {locale.code === "en-US" ? "$" : "€"}{" "}
          </button>
        </div>
        <ProductList
          products={products}
          onAddToCart={handleAddToCart}
          onDeleteProduct={handleDeleteProduct}
          onUpdateProduct={handleUpdateProduct}
        />
        <ToggleableAddProductForm onSubmit={handleAddProduct} />
      </main>
    </>
  );
};

export default App;
