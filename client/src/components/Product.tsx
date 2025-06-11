import { useContext } from "react";
import type { Product as ProductType } from "../types";
import { LocaleContext } from "../context/LocaleContext";

interface ProductProps {
  product: ProductType;
  onAddToCart: (productId: string) => void;
  onDeleteProduct: (_id: string) => void;
  onShowEditForm: () => void;
}

const Product = ({
  product,
  onAddToCart,
  onDeleteProduct,
  onShowEditForm,
}: ProductProps) => {
  const locale = useContext(LocaleContext);
  const { _id, title, price, quantity } = product;
  const handleAddToCartButtonClick = () => {
    onAddToCart(_id);
  };

  const finalPrice = locale.convert(price, locale.code);
  const currencySymbol = locale.code === "USD" ? "$" : "€";

  return (
    <div className="product-details">
      <h3>{title}</h3>
      <p className="price">
        {currencySymbol}
        {finalPrice.toFixed(2)}
      </p>
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
          <button className="edit" onClick={onShowEditForm}>
            Edit
          </button>
        </div>
      }

      <button className="delete-button" onClick={() => onDeleteProduct(_id)}>
        <span>X</span>
      </button>
    </div>
  );
};

export default Product;
