import type { CartItem } from "../types";

interface SetAction {
  type: "SET_CART_ITEMS";
  payload: {
    cartItems: Array<CartItem>;
  };
}

interface AddAction {
  type: "ADD_TO_CART";
  payload: {
    cartItem: CartItem;
  };
}

interface CheckoutAction {
  type: "CHECKOUT";
}

export const CartAction = {
  SetCartItems: (cartItems: Array<CartItem>): SetAction => ({
    type: "SET_CART_ITEMS",
    payload: {
      cartItems,
    },
  }),
  AddToCart: (cartItem: CartItem): AddAction => ({
    type: "ADD_TO_CART",
    payload: { cartItem },
  }),
  Checkout: (): CheckoutAction => ({
    type: "CHECKOUT",
  }),
};

type Action = SetAction | AddAction | CheckoutAction;

export const cartReducer = (cartItems: Array<CartItem>, action: Action) => {
  switch (action.type) {
    case "SET_CART_ITEMS":
      return action.payload.cartItems;
    case "ADD_TO_CART":
      if (cartItems.some((c) => c._id === action.payload.cartItem._id)) {
        return cartItems.map((c) =>
          c._id === action.payload.cartItem._id ? action.payload.cartItem : c,
        );
      } else {
        return [...cartItems, action.payload.cartItem];
      }
    case "CHECKOUT":
      return [];
    default:
      throw new Error("Invalid action type.");
  }
};
