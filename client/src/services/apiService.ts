import axios from "axios";
import { productSchema, cartItemSchema } from "../types";
import type { Product, NewProduct, CartItem } from "../types";

const getProducts = async (): Promise<Array<Product>> => {
  try {
    const response = await axios.get("/api/products");
    const parsedProducts = productSchema.array().parse(response.data);
    return parsedProducts;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const createProduct = async (newProduct: NewProduct): Promise<Product> => {
  try {
    const response = await axios.post("/api/products", newProduct);
    const parsedProduct = productSchema.parse(response.data);
    return parsedProduct;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const updateProduct = async (
  id: string,
  newProduct: NewProduct,
): Promise<Product> => {
  try {
    const response = await axios.put(`/api/products/${id}`, newProduct);
    const parsedProduct = productSchema.parse(response.data);
    return parsedProduct;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const deleteProduct = async (id: string): Promise<void> => {
  try {
    await axios.delete(`/api/products/${id}`);
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const getCartItems = async (): Promise<Array<CartItem>> => {
  try {
    const response = await axios.get("/api/cart");
    const parsedCartItems = cartItemSchema.array().parse(response.data);
    return parsedCartItems;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const checkoutCart = async (): Promise<void> => {
  try {
    await axios.post("/api/checkout");
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const addToCart = async (productId: string): Promise<[Product, CartItem]> => {
  try {
    const response = await axios.post("/api/add-to-cart", { productId });
    const parsedProduct = productSchema.parse(response.data.product);
    const parsedCartItem = cartItemSchema.parse(response.data.item);
    return [parsedProduct, parsedCartItem];
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export default {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getCartItems,
  checkoutCart,
  addToCart,
};
