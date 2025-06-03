import type { CartItem as CartItemType } from "../types";

interface CartItemsProps {
  items: Array<CartItemType>;
}

const CartItems = ({ items }: CartItemsProps) => {
  if (!items.length) return <p>Your cart is empty</p>;

  const total = items.reduce(
    (sum, { price, quantity }) => sum + price * quantity,
    0,
  );

  return (
    <table className="cart-items">
      <thead>
        <tr>
          <th scope="col">Item</th>
          <th scope="col">Quantity</th>
          <th scope="col">Price</th>
        </tr>
      </thead>
      <tbody>
        {items.map(({ _id, title, quantity, price }) => {
          return (
            <tr key={_id}>
              <td>{title}</td>
              <td>{quantity}</td>
              <td>${price}</td>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={3} className="total">
            Total: ${total.toFixed(2)}
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default CartItems;
