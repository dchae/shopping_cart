import { useState, useEffect, useReducer } from "react";
import apiService from "./services/apiService";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import ToggleableAddProductForm from "./components/ToggleableAddProductForm";
import { ProductAction, productsReducer } from "./reducers/productsReducer";
import type {
  CartItem as CartItemType,
  NewProduct as NewProductType,
} from "./types";

const App = () => {
  const [products, productDispatch] = useReducer(productsReducer, []);
  const [cartItems, setCartItems] = useState<Array<CartItemType>>([]);

  const handleAddToCart = async (productId: string, callback?: () => void) => {
    try {
      const [updatedProduct, updatedCartItem] =
        await apiService.addToCart(productId);

      productDispatch(ProductAction.Update(updatedProduct));
      setCartItems((cartItems) => {
        if (cartItems.some((c) => c._id === updatedCartItem._id)) {
          return cartItems.map((c) =>
            c._id === updatedCartItem._id ? updatedCartItem : c,
          );
        } else {
          return [...cartItems, updatedCartItem];
        }
      });

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
      productDispatch(ProductAction.Create(newProduct));

      if (callback) callback();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await apiService.deleteProduct(id);
      productDispatch(ProductAction.Delete(id));
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
      productDispatch(ProductAction.Update(updatedProduct));

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
      // setProducts(await apiService.getProducts());
      const products = await apiService.getProducts();
      productDispatch(ProductAction.Set(products));
      setCartItems(await apiService.getCartItems());
    })();
  }, []);

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
        <ToggleableAddProductForm onSubmit={handleAddProduct} />
      </main>
    </>
  );
};

export default App;
