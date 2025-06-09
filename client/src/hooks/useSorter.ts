import { useState, useMemo } from "react";
import type { Product } from "../types";

export type SortField = "name" | "price" | "quantity";
export type SortOrder = "ASC" | "DESC";

export interface SortState {
  sortBy: SortField;
  orderBy: SortOrder;
}

const useSorter = (products: Array<Product>, initialSortState: SortState) => {
  const [sortState, setSortState] = useState(initialSortState);

  const sortProducts = (products: Array<Product>, sortState: SortState) =>
    products.toSorted((a, b) => {
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

  const sortedProducts = useMemo(
    () => sortProducts(products, sortState),
    [products, sortState],
  );

  return { sortedProducts, sortState, setSortState };
};

export default useSorter;
