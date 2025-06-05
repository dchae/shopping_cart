import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import type { NewProduct } from "../types";
import type { Product as ProductType } from "../types";

interface ToggleableAddProductFormProps {
  onSubmit: (data: NewProduct, callback?: () => void) => void;
}

const ToggleableAddProductForm = ({
  onSubmit,
}: ToggleableAddProductFormProps) => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [formValues, setFormValues] = useState({
    title: "",
    price: "",
    quantity: "",
  });
  const { title, price, quantity } = formValues;

  const valueChangeHandler = (prop: keyof ProductType) => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      setFormValues((p) => ({ ...p, [prop]: e.target.value }));
    };
  };

  const handleReset = () => {
    setFormValues({
      title: "",
      price: "",
      quantity: "",
    });

    setShowForm(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onSubmit(
      {
        title: title,
        price: Number(price),
        quantity: Number(quantity),
      },
      handleReset,
    );
  };

  if (!showForm) {
    return (
      <p>
        <button
          className="add-product-button"
          onClick={() => setShowForm(true)}
        >
          Add A Product
        </button>
      </p>
    );
  }

  return (
    <div className="add-form">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="product-name">Product Name:</label>
          <input
            type="text"
            id="product-name"
            name="product-name"
            value={title}
            onChange={valueChangeHandler("title")}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="product-price">Price:</label>
          <input
            type="number"
            id="product-price"
            name="product-price"
            min="0"
            step="0.01"
            value={price}
            onChange={valueChangeHandler("price")}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="product-quantity">Quantity:</label>
          <input
            type="number"
            id="product-quantity"
            name="product-quantity"
            min="0"
            value={quantity}
            onChange={valueChangeHandler("quantity")}
            required
          />
        </div>

        <div className="actions form-actions">
          <button type="submit">Add</button>{" "}
          <button type="button" onClick={() => setShowForm(false)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ToggleableAddProductForm;
