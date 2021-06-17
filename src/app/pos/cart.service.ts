import { Injectable } from '@angular/core';
import { Product } from '../products/product.interface';
import { CartItem } from './cart-item.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _items: CartItem[];

  constructor() {
    this._items = [];
  }

  get items(): CartItem[] {
    return this._items;
  }

  get total(): number {
    const sum = this._items.reduce((sum, current) => sum + (current.product.price * current.quantity), 0);
    return sum;
  }

  addItem(product: Product): void {

    const items = this._items.filter(cartItem => cartItem.product.id === product.id);

    if (items.length === 0) {
      this._items.unshift(new CartItem(product, 1));
    }
    else {
      const newItem = new CartItem(product, items[0].quantity + 1);
      this.removeItem(product);
      this._items.unshift(newItem);
    }

  }

  removeItem(product: Product): void {
    this._items = this._items.filter(cartItem => cartItem.product.id !== product.id);
  }

}
