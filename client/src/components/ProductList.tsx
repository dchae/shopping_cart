import Product from "./Product";
import type {
  Product as ProductType,
  CartItem as CartItemType,
} from "../types";

interface ProductListProps {
  products: Array<ProductType>;
  handleAddToCart: (item: CartItemType) => void;
  handleDeleteProduct: (_id: string) => void;
}

const ProductList = ({
  products,
  handleAddToCart,
  handleDeleteProduct,
}: ProductListProps) => {
  return (
    <div className="product-listing">
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <Product
            key={product._id}
            product={product}
            handleAddToCart={handleAddToCart}
            handleDeleteProduct={handleDeleteProduct}
          />
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
