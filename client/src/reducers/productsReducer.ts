import type { Product } from "../types";

interface SetAction {
  type: "set";
  products: Array<Product>;
}

interface CreateAction {
  type: "create";
  product: Product;
}

interface UpdateAction {
  type: "update";
  product: Product;
}

interface DeleteAction {
  type: "delete";
  id: string;
}

export const ProductAction = {
  Set: (products: Array<Product>): SetAction => ({ type: "set", products }),
  Create: (product: Product): CreateAction => ({ type: "create", product }),
  Update: (product: Product): UpdateAction => ({
    type: "update",
    product,
  }),
  Delete: (id: string): DeleteAction => ({
    type: "delete",
    id,
  }),
};

type Action = SetAction | CreateAction | UpdateAction | DeleteAction;

export const productsReducer = (products: Array<Product>, action: Action) => {
  switch (action.type) {
    case "set":
      return action.products;
    case "create":
      return [...products, action.product];
    case "update":
      return products.map((product) =>
        product._id === action.product._id ? action.product : product,
      );
    case "delete":
      return products.filter((product) => product._id !== action.id);
    default:
      throw new Error("Invalid action type.");
  }
};
