import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { NewProduct } from "../types";
import { newProductSchema } from "../types";

interface AddProductFormProps {
  onSubmit: (data: NewProduct) => void;
  onHide: () => void;
}

const AddProductForm = ({ onSubmit, onHide }: AddProductFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(newProductSchema) });

  return (
    <div className="add-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group">
          <label htmlFor="product-name">Product Name:</label>
          <input
            type="text"
            id="product-name"
            required
            {...register("title")}
          />
          {errors.title && <p>{errors.title.message}</p>}
        </div>

        <div className="input-group">
          <label htmlFor="product-price">Price:</label>
          <input
            type="number"
            id="product-price"
            min="0"
            step="0.01"
            required
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price && <p>{errors.price.message}</p>}
        </div>

        <div className="input-group">
          <label htmlFor="product-quantity">Quantity:</label>
          <input
            type="number"
            id="product-quantity"
            min="0"
            required
            {...register("quantity", { valueAsNumber: true })}
          />
          {errors.quantity && <p>{errors.quantity.message}</p>}
        </div>

        <div className="actions form-actions">
          <button type="submit">Add</button>{" "}
          <button type="button" onClick={onHide}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
