import { useState } from "react";
import EditProductForm from "./EditProductForm";
import type {
  Product as ProductType,
  CartItem as CartItemType,
} from "../types";

interface ProductProps {
  product: ProductType;
  addToCart: (item: CartItemType) => void;
  deleteProduct: (_id: string) => void;
}

const Product = ({ product, addToCart, deleteProduct }: ProductProps) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const { _id, title, price, quantity } = product;
  const handleAddToCart = () => {
    const cartItem = {
      _id: "a" + _id,
      productId: _id,
      title,
      price,
      quantity: 1,
    };
    addToCart(cartItem);
  };

  const handleEditButtonClick = () => {
    setShowEditForm((val) => !val);
  };

  return (
    <li className="product">
      <div className="product-details">
        <h3>{title}</h3>
        <p className="price">${price}</p>
        <p className="quantity">{quantity} left in stock</p>
        <div className="actions product-actions">
          <button
            className="add-to-cart"
            onClick={handleAddToCart}
            disabled={!quantity}
          >
            Add to Cart
          </button>{" "}
          <button className="edit" onClick={handleEditButtonClick}>
            Edit
          </button>
        </div>

        <button className="delete-button" onClick={() => deleteProduct(_id)}>
          <span>X</span>
        </button>
      </div>
      {showEditForm && (
        <EditProductForm product={product} setShowEditForm={setShowEditForm} />
      )}
    </li>
  );
};

export default Product;
