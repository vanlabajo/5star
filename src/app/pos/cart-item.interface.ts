import { Product } from "../products/product.interface";

export class CartItem {
  private _product: Product;
  private _quantity: number;

  constructor(product: Product, quantity: number) {
    this._product = product;
    this._quantity = quantity;
  }

  get product(): Product {
    return this._product
  }

  get quantity(): number {
    return this._quantity;
  }

  get total(): number {
    return this._product.price * this._quantity;
  }
}
