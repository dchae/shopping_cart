import EditableProduct from "./EditableProduct";
import type {
  Product as ProductType,
  NewProduct as NewProductType,
} from "../types";

interface ProductListProps {
  products: Array<ProductType>;
  onAddToCart: (productId: string) => void;
  onDeleteProduct: (_id: string) => void;
  onUpdateProduct: (
    id: string,
    data: NewProductType,
    callback?: () => void,
  ) => void;
}

const ProductList = ({
  products,
  onAddToCart,
  onDeleteProduct,
  onUpdateProduct,
}: ProductListProps) => {
  return (
    <div className="product-listing">
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <EditableProduct
            key={product._id}
            product={product}
            onAddToCart={onAddToCart}
            onDeleteProduct={onDeleteProduct}
            onUpdateProduct={onUpdateProduct}
          />
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
