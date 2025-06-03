import CartItems from "./CartItems";
import type { CartItem as CartItemType } from "../types";

interface CartProps {
  items: Array<CartItemType>;
}

const Cart = ({ items }: CartProps) => {
  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <CartItems items={items} />
      <button className="checkout" disabled={!items.length}>
        Checkout
      </button>
    </div>
  );
};

export default Cart;
