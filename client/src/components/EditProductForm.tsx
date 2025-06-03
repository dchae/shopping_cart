import { useState } from "react";
import type { ChangeEvent } from "react";
import type { Product as ProductType } from "../types";

interface EditProductFormProps {
  product: ProductType;
  setShowEditForm: (val: boolean) => void;
}

const EditProductForm = ({
  product,
  setShowEditForm,
}: EditProductFormProps) => {
  const [formValues, setFormValues] = useState<ProductType>(product);
  const { title, price, quantity } = formValues;

  const valueChangeHandler = (prop: keyof ProductType) => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      setFormValues((p) => ({ ...p, [prop]: e.target.value }));
    };
  };

  return (
    <div className="edit-form">
      <h3>Edit Product</h3>
      <form>
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
          <button type="button">Update</button>
          <button type="button" onClick={() => setShowEditForm(false)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductForm;
