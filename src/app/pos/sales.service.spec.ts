import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpErrorHandler } from '../http-error-handler/http-error-handler.service';
import { MonthlySales } from './monthly-sales.interface';

import { SalesService } from './sales.service';

describe('SalesService', () => {
  let httpTestingController: HttpTestingController;
  let service: SalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [HttpClientTestingModule],
      // Provide the service-under-test and its dependencies
      providers: [SalesService, HttpErrorHandler]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(SalesService);

  });

  it('should return monthly sales', () => {
    const expectedSales: MonthlySales = { year: 2021, jan: 0, feb: 0, mar: 0, apr: 0, may: 2000, jun: 0, jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0 };

    service.getMonthlySales(2021).subscribe(
      sales => expect(sales).toEqual(expectedSales, 'should return expected monthly sales'),
      fail
    );

    // SalesService should have made one request to GET monthly sales from expected URL
    const req = httpTestingController.expectOne(`${service.salesUrl}/${2021}`);
    expect(req.request.method).toEqual('GET');

    // Respond with the mock products
    req.flush(expectedSales);

  });

  it('should turn 404 into an undefined monthly sales result with 3 retries', () => {

    service.getMonthlySales(2022).subscribe(
      sales => expect(sales).toEqual(Object({}), 'should return Object({})'),
      fail
    );

    // respond with a 404 and the error message in the body
    const msg = 'deliberate 404 error';
    const retryCount = 3;
    for (var i = 0, c = retryCount + 1; i < c; i++) {
      let req = httpTestingController.expectOne(`${service.salesUrl}/${2022}`);
      req.flush(msg, { status: 404, statusText: 'Not Found' });
    }

  });

  it('should return today sales', () => {
    const expectedSales: number = 10000;

    service.getTodaySales().subscribe(
      sales => expect(sales).toEqual(expectedSales, 'should return expected today sales'),
      fail
    );

    // SalesService should have made one request to GET monthly sales from expected URL
    const req = httpTestingController.expectOne(`${service.salesUrl}/today`);
    expect(req.request.method).toEqual('GET');

    // Respond with the mock products
    req.flush(expectedSales);

  });

  it('should turn 404 into 0 today sales result with 3 retries', () => {
    service.getTodaySales().subscribe(
      sales => expect(sales).toEqual(0, 'should return 0 today sales'),
      fail
    );

    // respond with a 404 and the error message in the body
    const msg = 'deliberate 404 error';
    const retryCount = 3;
    for (var i = 0, c = retryCount + 1; i < c; i++) {
      let req = httpTestingController.expectOne(`${service.salesUrl}/today`);
      req.flush(msg, { status: 404, statusText: 'Not Found' });
    }

  });

});
