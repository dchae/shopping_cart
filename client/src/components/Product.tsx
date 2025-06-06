import { useState } from "react";
import EditProductForm from "./EditProductForm";
import type {
  Product as ProductType,
  NewProduct as NewProductType,
} from "../types";

interface ProductProps {
  product: ProductType;
  onAddToCart: (productId: string) => void;
  onDeleteProduct: (_id: string) => void;
  onUpdateProduct: (
    id: string,
    data: NewProductType,
    callback?: () => void,
  ) => void;
}

const Product = ({
  product,
  onAddToCart,
  onDeleteProduct,
  onUpdateProduct,
}: ProductProps) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const { _id, title, price, quantity } = product;
  const handleAddToCartButtonClick = () => {
    onAddToCart(_id);
  };

  return (
    <li className="product">
      <div className="product-details">
        <h3>{title}</h3>
        <p className="price">${price}</p>
        <p className="quantity">{quantity} left in stock</p>

        {
          <div className="actions product-actions">
            <button
              className="add-to-cart"
              onClick={handleAddToCartButtonClick}
              disabled={!quantity}
            >
              Add to Cart
            </button>{" "}
            <button className="edit" onClick={() => setShowEditForm(true)}>
              Edit
            </button>
          </div>
        }

        <button className="delete-button" onClick={() => onDeleteProduct(_id)}>
          <span>X</span>
        </button>
      </div>

      {showEditForm && (
        <EditProductForm
          product={product}
          onSubmit={onUpdateProduct}
          hide={() => setShowEditForm(false)}
        />
      )}
    </li>
  );
};

export default Product;
