import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { HandleError, HttpErrorHandler } from '../http-error-handler/http-error-handler.service';
import { PagedQuery } from '../models/paged-query.interface';
import { PagedResult } from '../models/paged-result.interface';
import { Invoice } from './invoice.interface';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  readonly invoicesUrl: string;
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler
  ) {
    this.invoicesUrl = `${environment.baseUrl}/api/invoices`;
    this.handleError = httpErrorHandler.createHandleError('InvoiceService');
  }

  getInvoices(pagedQuery: PagedQuery): Observable<PagedResult<Invoice>> {
    const httpOptions = {
      params: new HttpParams()
        .append('searchTerm', pagedQuery.searchTerm)
        .append('pageInfo.page', pagedQuery.pageInfo.page.toString())
        .append('pageInfo.pageSize', pagedQuery.pageInfo.pageSize.toString())
    };

    return this.http.get<PagedResult<Invoice>>(this.invoicesUrl, httpOptions)
      .pipe(
        retry(3),
        catchError(this.handleError<PagedResult<Invoice>>('getInvoices', { data: [] } as PagedResult<Invoice>))
      );
  }

  getInvoice(id: number): Observable<Invoice> {
    const url = `${this.invoicesUrl}/${id}`; // GET api/invoices/42
    return this.http.get<Invoice>(url)
      .pipe(
        retry(3),
        catchError(this.handleError<Invoice>('getInvoice'))
      );
  }

  getInvoiceByReferenceNumber(referenceNumber: string): Observable<Invoice> {
    const url = `${this.invoicesUrl}/search/${referenceNumber}`; // GET api/invoices/search/123456
    return this.http.get<Invoice>(url)
      .pipe(
        retry(3),
        catchError(this.handleError<Invoice>('getInvoiceByReferenceNumber'))
      );
  }
}
