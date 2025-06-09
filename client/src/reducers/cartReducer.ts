import type { CartItem } from "../types";

interface SetAction {
  type: "set";
  cartItems: Array<CartItem>;
}

interface AddAction {
  type: "add";
  cartItem: CartItem;
}

interface CheckoutAction {
  type: "checkout";
}

export const CartAction = {
  Set: (cartItems: Array<CartItem>): SetAction => ({ type: "set", cartItems }),
  Add: (cartItem: CartItem): AddAction => ({ type: "add", cartItem }),
  Checkout: (): CheckoutAction => ({
    type: "checkout",
  }),
};

type Action = SetAction | AddAction | CheckoutAction;

export const cartReducer = (cartItems: Array<CartItem>, action: Action) => {
  switch (action.type) {
    case "set":
      return action.cartItems;
    case "add":
      if (cartItems.some((c) => c._id === action.cartItem._id)) {
        return cartItems.map((c) =>
          c._id === action.cartItem._id ? action.cartItem : c,
        );
      } else {
        return [...cartItems, action.cartItem];
      }
    case "checkout":
      return [];
    default:
      throw new Error("Invalid action type.");
  }
};
