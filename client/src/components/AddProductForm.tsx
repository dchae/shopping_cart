import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import type { NewProduct } from "../types";

interface AddProductFormProps {
  addProduct: (data: NewProduct) => void;
  hideForm: () => void;
}

const AddProductForm = ({ addProduct, hideForm }: AddProductFormProps) => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuantity(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    addProduct({
      title: name,
      price: Number(price),
      quantity: Number(quantity),
    });
  };
  return (
    <div className="add-form">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="product-name">Product Name:</label>
          <input
            type="text"
            id="product-name"
            name="product-name"
            value={name}
            onChange={handleNameChange}
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
            onChange={handlePriceChange}
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
            onChange={handleQuantityChange}
            required
          />
        </div>
        <div className="actions form-actions">
          <button type="submit">Add</button>{" "}
          <button type="button" onClick={hideForm}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
