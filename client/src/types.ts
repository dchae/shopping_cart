export interface Product {
  _id: string;
  title: string;
  price: number;
  quantity: number;
}

export type NewProduct = Omit<Product, "_id">;

// Note that quantity for CartItem refers to the cart quantity, not stock quantity
export interface CartItem extends Product {
  productId: string;
}
