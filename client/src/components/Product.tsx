import { useState } from "react";
import EditProductForm from "./EditProductForm";
import type {
  Product as ProductType,
  CartItem as CartItemType,
} from "../types";

interface ProductProps {
  product: ProductType;
  handleAddToCart: (item: CartItemType) => void;
  handleDeleteProduct: (_id: string) => void;
}

const Product = ({
  product,
  handleAddToCart,
  handleDeleteProduct,
}: ProductProps) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const { _id, title, price, quantity } = product;
  const onAddToCartButtonClick = () => {
    const cartItem = {
      _id: "a" + _id,
      productId: _id,
      title,
      price,
      quantity: 1,
    };
    handleAddToCart(cartItem);
  };

  return (
    <li className="product">
      <div className="product-details">
        <h3>{title}</h3>
        <p className="price">${price}</p>
        <p className="quantity">{quantity} left in stock</p>

        {!showEditForm && (
          <div className="actions product-actions">
            <button
              className="add-to-cart"
              onClick={onAddToCartButtonClick}
              disabled={!quantity}
            >
              Add to Cart
            </button>{" "}
            <button className="edit" onClick={() => setShowEditForm(true)}>
              Edit
            </button>
          </div>
        )}

        <button
          className="delete-button"
          onClick={() => handleDeleteProduct(_id)}
        >
          <span>X</span>
        </button>
      </div>

      {showEditForm && (
        <EditProductForm
          product={product}
          hide={() => setShowEditForm(false)}
        />
      )}
    </li>
  );
};

export default Product;
