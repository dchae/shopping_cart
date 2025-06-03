import Product from "./Product";
import type {
  Product as ProductType,
  CartItem as CartItemType,
} from "../types";

interface ProductListProps {
  products: Array<ProductType>;
  addToCart: (item: CartItemType) => void;
  deleteProduct: (_id: string) => void;
}

const ProductList = ({
  products,
  addToCart,
  deleteProduct,
}: ProductListProps) => {
  return (
    <div className="product-listing">
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <Product
            key={product._id}
            product={product}
            addToCart={addToCart}
            deleteProduct={deleteProduct}
          />
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
