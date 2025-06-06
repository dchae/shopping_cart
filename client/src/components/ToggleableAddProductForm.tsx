import { useState } from "react";
import type { NewProduct } from "../types";
import AddProductForm from "./AddProductForm";

interface ToggleableAddProductFormProps {
  onSubmit: (data: NewProduct, callback?: () => void) => void;
}

const ToggleableAddProductForm = ({
  onSubmit,
}: ToggleableAddProductFormProps) => {
  const [showForm, setShowForm] = useState<boolean>(false);

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
    <AddProductForm onSubmit={onSubmit} onHide={() => setShowForm(false)} />
  );
};

export default ToggleableAddProductForm;
