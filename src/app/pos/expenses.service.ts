import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { HandleError, HttpErrorHandler } from '../http-error-handler/http-error-handler.service';
import { MonthlyExpenses } from './monthly-expenses.interface';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  readonly expensesUrl: string;
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler
  ) {
    this.expensesUrl = `${environment.baseUrl}/api/expenses`;
    this.handleError = httpErrorHandler.createHandleError('CartService');
  }

  getMonthlyExpenses(year: number): Observable<MonthlyExpenses> {
    const url = `${this.expensesUrl}/${year}`; // GET api/expenses/2021
    return this.http.get<MonthlyExpenses>(url)
      .pipe(
        retry(3),
        catchError(this.handleError<MonthlyExpenses>('getMonthlyExpenses'))
      );
  }
}
