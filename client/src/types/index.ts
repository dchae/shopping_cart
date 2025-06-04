import { z } from "zod";

export const productSchema = z.object({
  _id: z.string(),
  title: z.string(),
  price: z.number(),
  quantity: z.number(),
});

export type Product = z.infer<typeof productSchema>;

export const newProductSchema = productSchema.omit({ _id: true });

export type NewProduct = z.infer<typeof newProductSchema>;

export const cartItemSchema = productSchema.extend({ productId: z.string() });

// Note that quantity for CartItem refers to the cart quantity, not stock quantity
export type CartItem = z.infer<typeof cartItemSchema>;
