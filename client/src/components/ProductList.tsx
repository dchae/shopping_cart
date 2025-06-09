import { useState } from "react";
import EditableProduct from "./EditableProduct";
import SortToolbar from "./SortToolbar";
import type { SortState } from "./SortToolbar";
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
  const [sortState, setSortState] = useState<SortState>({
    sortBy: "name",
    orderBy: "ASC",
  });

  const sortedProducts = products.toSorted((a, b) => {
    if (sortState.orderBy === "DESC") [a, b] = [b, a];
    switch (sortState.sortBy) {
      case "name":
        return a.title
          .toLocaleLowerCase()
          .localeCompare(b.title.toLocaleLowerCase());
      case "price":
      case "quantity":
        return a[sortState.sortBy] - b[sortState.sortBy];
      default:
        throw new Error("Unhandled sort field");
    }
  });

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
