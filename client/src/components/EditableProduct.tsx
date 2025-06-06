import { useState } from "react";
import EditProductForm from "./EditProductForm";
import Product from "./Product";
import type {
  Product as ProductType,
  NewProduct as NewProductType,
} from "../types";

interface EditableProductProps {
  product: ProductType;
  onAddToCart: (productId: string) => void;
  onDeleteProduct: (_id: string) => void;
  onUpdateProduct: (
    id: string,
    data: NewProductType,
    callback?: () => void,
  ) => void;
}

const EditableProduct = ({
  product,
  onAddToCart,
  onDeleteProduct,
  onUpdateProduct,
}: EditableProductProps) => {
  const [showEditForm, setShowEditForm] = useState(false);

  return (
    <li className="product">
      <Product
        product={product}
        onAddToCart={onAddToCart}
        onDeleteProduct={onDeleteProduct}
        onShowEditForm={() => setShowEditForm(true)}
      />

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

export default EditableProduct;
