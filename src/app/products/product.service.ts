import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { HandleError, HttpErrorHandler } from '../http-error-handler/http-error-handler.service';
import { PagedQuery } from '../models/paged-query.interface';
import { PagedResult } from '../models/paged-result.interface';
import { ServiceResult } from '../models/service-result.interface';
import { Product } from './product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  readonly productsUrl: string;
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler
  ) {
    this.productsUrl = `${environment.baseUrl}/api/products`;
    this.handleError = httpErrorHandler.createHandleError('ProductService');
  }

  getProducts(pagedQuery: PagedQuery): Observable<PagedResult<Product>> {
    const httpOptions = {
      params: new HttpParams()
        .append('searchTerm', pagedQuery.searchTerm)
        .append('pageInfo.page', pagedQuery.pageInfo.page.toString())
        .append('pageInfo.pageSize', pagedQuery.pageInfo.pageSize.toString())
    };

    return this.http.get<PagedResult<Product>>(this.productsUrl, httpOptions)
      .pipe(
        retry(3),
        catchError(this.handleError<PagedResult<Product>>('getProducts', { data: [] } as PagedResult<Product>))
      );
  }

  getProduct(id: number): Observable<Product> {
    const url = `${this.productsUrl}/${id}`; // GET api/products/42
    return this.http.get<Product>(url)
      .pipe(
        retry(3),
        catchError(this.handleError<Product>('getProduct'))
      );
  }

  //////// Save methods //////////

  /** POST: add a new product to the database */
  addProduct(product: Product): Observable<ServiceResult> {
    return this.http.post<ServiceResult>(this.productsUrl, product)
      .pipe(
        catchError(this.handleError('addProduct', { success: false, validationErrors: undefined } as ServiceResult))
      );
  }

  /** DELETE: delete the product from the server */
  deleteProduct(id: number): Observable<ServiceResult> {
    const url = `${this.productsUrl}/${id}`; // DELETE api/products/42
    return this.http.delete<ServiceResult>(url)
      .pipe(
        catchError(this.handleError('deleteProduct', { success: false, validationErrors: undefined } as ServiceResult))
      );
  }

  /** PUT: update the product on the server. Returns the updated product upon success. */
  updateProduct(product: Product): Observable<ServiceResult> {
    const url = `${this.productsUrl}/${product.id}`; // PUT api/products/42
    return this.http.put<ServiceResult>(url, product)
      .pipe(
        catchError(this.handleError('updateProduct', { success: false, validationErrors: undefined } as ServiceResult))
      );
  }
}
