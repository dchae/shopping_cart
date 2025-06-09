import EditableProduct from "./EditableProduct";
import SortToolbar from "./SortToolbar";
import useSorter from "../hooks/useSorter";
import type { SortState } from "../hooks/useSorter";
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
  const initialSortState: SortState = {
    sortBy: "name",
    orderBy: "ASC",
  };

  const { sortedProducts, sortState, setSortState } = useSorter(
    products,
    initialSortState,
  );

  return (
    <div className="product-listing">
      <h2 style={{ margin: 0 }}>Products</h2>
      <SortToolbar sortState={sortState} setSortState={setSortState} />
      <ul>
        {sortedProducts.map((product) => (
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
