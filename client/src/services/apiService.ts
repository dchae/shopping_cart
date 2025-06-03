import { mockProducts } from "../mockData/data";
import type { Product as ProductType } from "../types";

const getProducts = async (): Promise<Array<ProductType>> => {
  return mockProducts;
};

export default { getProducts };
