import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { HandleError, HttpErrorHandler } from '../http-error-handler/http-error-handler.service';
import { MonthlySales } from './monthly-sales.interface';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  readonly salesUrl: string;
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler
  ) {
    this.salesUrl = `${environment.baseUrl}/api/sales`;
    this.handleError = httpErrorHandler.createHandleError('CartService');
  }

  getMonthlySales(year: number): Observable<MonthlySales> {
    const url = `${this.salesUrl}/${year}`; // GET api/sales/2021
    return this.http.get<MonthlySales>(url)
      .pipe(
        retry(3),
        catchError(this.handleError<MonthlySales>('getMonthlySales'))
      );
  }

  getTodaySales(): Observable<number> {
    const url = `${this.salesUrl}/today`; // GET api/sales/today
    return this.http.get<number>(url)
      .pipe(
        retry(3),
        catchError(this.handleError<number>('getTodaySales', 0))
      );
  }
}
