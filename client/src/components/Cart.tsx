import CartItems from "./CartItems";
import type { CartItem as CartItemType } from "../types";

interface CartProps {
  items: Array<CartItemType>;
  onCheckout: () => Promise<void>;
}

const Cart = ({ items, onCheckout }: CartProps) => {
  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <CartItems items={items} />
      <button
        className="checkout"
        disabled={!items.length}
        onClick={onCheckout}
      >
        Checkout
      </button>
    </div>
  );
};

export default Cart;
