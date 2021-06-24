import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { HandleError, HttpErrorHandler } from '../http-error-handler/http-error-handler.service';
import { ServiceResult } from '../models/service-result.interface';
import { Product } from '../products/product.interface';
import { CartItem } from './cart-item.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  readonly checkoutUrl: string;
  private _items: CartItem[];
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler
  ) {
    this.checkoutUrl = `${environment.baseUrl}/api/checkout`;
    this._items = [];
    this.handleError = httpErrorHandler.createHandleError('CartService');
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

  resetCart(): void {
    this._items = [];
  }

  checkout(): Observable<ServiceResult> {
    return this.http.post<ServiceResult>(this.checkoutUrl, this.items.map(item => ({ productId: item.product.id, quantity: item.quantity })))
      .pipe(
        catchError(this.handleError('checkout', { success: false, validationErrors: undefined } as ServiceResult))
      );
  }

}
