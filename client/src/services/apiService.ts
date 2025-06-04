import axios from "axios";
import type { Product as ProductType } from "../types";

const getProducts = async (): Promise<Array<ProductType>> => {
  const response = await axios.get("/api/products");
  return response.data;
};

export default { getProducts };
