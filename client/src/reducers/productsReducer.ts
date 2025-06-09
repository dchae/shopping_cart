import type { Product } from "../types";

interface SetAction {
  type: "SET_PRODUCTS";
  payload: {
    products: Array<Product>;
  };
}

interface AddAction {
  type: "ADD_PRODUCT";
  payload: {
    product: Product;
  };
}

interface UpdateAction {
  type: "UPDATE_PRODUCT";
  payload: {
    product: Product;
  };
}

interface DeleteAction {
  type: "DELETE_PRODUCT";
  payload: {
    id: string;
  };
}

export const ProductAction = {
  SetProducts: (products: Array<Product>): SetAction => ({
    type: "SET_PRODUCTS",
    payload: { products },
  }),
  AddProduct: (product: Product): AddAction => ({
    type: "ADD_PRODUCT",
    payload: {
      product,
    },
  }),
  UpdateProduct: (product: Product): UpdateAction => ({
    type: "UPDATE_PRODUCT",
    payload: {
      product,
    },
  }),
  DeleteProduct: (id: string): DeleteAction => ({
    type: "DELETE_PRODUCT",
    payload: {
      id,
    },
  }),
};

type Action = SetAction | AddAction | UpdateAction | DeleteAction;

export const productsReducer = (products: Array<Product>, action: Action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return action.payload.products;
    case "ADD_PRODUCT":
      return [...products, action.payload.product];
    case "UPDATE_PRODUCT":
      return products.map((product) =>
        product._id === action.payload.product._id
          ? action.payload.product
          : product,
      );
    case "DELETE_PRODUCT":
      return products.filter((product) => product._id !== action.payload.id);
    default:
      throw new Error("Invalid action type.");
  }
};
