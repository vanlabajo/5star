import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpErrorHandler } from '../http-error-handler/http-error-handler.service';

import { ExpensesService } from './expenses.service';
import { MonthlyExpenses } from './monthly-expenses.interface';

describe('ExpensesService', () => {
  let httpTestingController: HttpTestingController;
  let service: ExpensesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [HttpClientTestingModule],
      // Provide the service-under-test and its dependencies
      providers: [ExpensesService, HttpErrorHandler]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ExpensesService);

  });

  it('should return monthly expenses', () => {
    const expectedExpenses: MonthlyExpenses = { year: 2021, jan: 0, feb: 0, mar: 0, apr: 0, may: 2000, jun: 0, jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0 };

    service.getMonthlyExpenses(2021).subscribe(
      expenses => expect(expenses).toEqual(expectedExpenses, 'should return expected monthly expenses'),
      fail
    );

    // SalesService should have made one request to GET monthly sales from expected URL
    const req = httpTestingController.expectOne(`${service.expensesUrl}/${2021}`);
    expect(req.request.method).toEqual('GET');

    // Respond with the mock products
    req.flush(expectedExpenses);

  });

  it('should turn 404 into an undefined monthly expenses result with 3 retries', () => {

    service.getMonthlyExpenses(2022).subscribe(
      expenses => expect(expenses).toEqual(Object({}), 'should return Object({})'),
      fail
    );

    // respond with a 404 and the error message in the body
    const msg = 'deliberate 404 error';
    const retryCount = 3;
    for (var i = 0, c = retryCount + 1; i < c; i++) {
      let req = httpTestingController.expectOne(`${service.expensesUrl}/${2022}`);
      req.flush(msg, { status: 404, statusText: 'Not Found' });
    }

  });

});
