import { Product } from "../products/product.interface";

export interface InvoiceItem {
  product: Product,
  quantity: number,
  total: number
}
