import { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import type {
  Product as ProductType,
  NewProduct as NewProductType,
} from "../types";

interface EditProductFormProps {
  product: ProductType;
  onSubmit: (id: string, data: NewProductType, callback?: () => void) => void;
  hide: () => void;
}

const EditProductForm = ({ product, hide, onSubmit }: EditProductFormProps) => {
  const initialValue: NewProductType = {
    title: product.title,
    price: product.price,
    quantity: product.quantity,
  };
  const [newProduct, setNewProduct] = useState<NewProductType>(initialValue);
  const { title, price, quantity } = newProduct;

  const valueChangeHandler = (prop: keyof ProductType) => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      setNewProduct((p) => ({ ...p, [prop]: e.target.value }));
    };
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(product._id, newProduct, hide);
  };

  useEffect(() => {
    setNewProduct((p) => ({ ...p, quantity: product.quantity }));
  }, [product.quantity]);

  return (
    <div className="edit-form">
      <h3>Edit Product</h3>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="product-name">Product Name</label>
          <input
            type="text"
            id="product-name"
            value={title}
            onChange={valueChangeHandler("title")}
            aria-label="Product Name"
          />
        </div>

        <div className="input-group">
          <label htmlFor="product-price">Price</label>
          <input
            type="number"
            id="product-price"
            value={price}
            onChange={valueChangeHandler("price")}
            aria-label="Product Price"
          />
        </div>

        <div className="input-group">
          <label htmlFor="product-quantity">Quantity</label>
          <input
            type="number"
            id="product-quantity"
            value={quantity}
            onChange={valueChangeHandler("quantity")}
            aria-label="Product Quantity"
          />
        </div>

        <div className="actions form-actions">
          <button type="submit">Update</button>
          <button type="button" onClick={hide}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductForm;
