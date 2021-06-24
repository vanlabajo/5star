import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpErrorHandler } from '../http-error-handler/http-error-handler.service';
import { PagedQuery } from '../models/paged-query.interface';
import { PagedResult } from '../models/paged-result.interface';
import { Invoice } from './invoice.interface';

import { InvoiceService } from './invoice.service';

describe('InvoiceService', () => {
  let httpTestingController: HttpTestingController;
  let service: InvoiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [HttpClientTestingModule],
      // Provide the service-under-test and its dependencies
      providers: [InvoiceService, HttpErrorHandler]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(InvoiceService);
  });

  it('should return paged invoices products (called once)', () => {
    const pagedQuery: PagedQuery = {
      searchTerm: '',
      pageInfo: {
        page: 1,
        pageSize: 30
      }
    };

    const expectedInvoices: Invoice[] = [
      { id: 1, referenceNumber: '123456', createdTime: new Date(), items: [] },
      { id: 2, referenceNumber: '123457', createdTime: new Date(), items: [] },
    ];

    const pagedResult: PagedResult<Invoice> = {
      data: expectedInvoices,
      collectionSize: expectedInvoices.length
    }

    service.getInvoices(pagedQuery).subscribe(
      result => expect(result.data).toEqual(expectedInvoices, 'should return expected invoices'),
      fail
    );

    // InvoiceService should have made one request to GET products from expected URL
    const req = httpTestingController.expectOne(service.invoicesUrl + '?searchTerm=&pageInfo.page=1&pageInfo.pageSize=30');
    expect(req.request.method).toEqual('GET');

    // Respond with the mock result
    req.flush(pagedResult);
  });

  it('should turn 404 into an empty paged result with 3 retries', () => {
    const pagedQuery: PagedQuery = {
      searchTerm: '',
      pageInfo: {
        page: 1,
        pageSize: 30
      }
    };

    service.getInvoices(pagedQuery).subscribe(
      result => expect(result.data.length).toEqual(0, 'should have empty result'),
      fail
    );

    // respond with a 404 and the error message in the body
    const msg = 'deliberate 404 error';
    const retryCount = 3;
    for (var i = 0, c = retryCount + 1; i < c; i++) {
      let req = httpTestingController.expectOne(service.invoicesUrl + '?searchTerm=&pageInfo.page=1&pageInfo.pageSize=30');
      req.flush(msg, { status: 404, statusText: 'Not Found' });
    }
  });

  it('should return expected invoice (called once)', () => {
    const expectedInvoice: Invoice = { id: 1, referenceNumber: '123456', createdTime: new Date(), items: [] };

    service.getInvoice(1).subscribe(
      invoice => expect(invoice).toEqual(expectedInvoice, 'should return expected invoice'),
      fail
    );

    const req = httpTestingController.expectOne(`${service.invoicesUrl}/${1}`);
    expect(req.request.method).toEqual('GET');

    // Respond with the mock invoice
    req.flush(expectedInvoice);
  });

  // This service reports the error but finds a way to let the app keep going.
  it('should turn 404 into an undefined invoice result with 3 retries', () => {

    service.getInvoice(1).subscribe(
      invoice => expect(invoice).toEqual(Object({}), 'should return Object({})'),
      fail
    );

    // respond with a 404 and the error message in the body
    const msg = 'deliberate 404 error';
    const retryCount = 3;
    for (var i = 0, c = retryCount + 1; i < c; i++) {
      let req = httpTestingController.expectOne(`${service.invoicesUrl}/${1}`);
      req.flush(msg, { status: 404, statusText: 'Not Found' });
    }

  });

  it('should return expected invoice (by reference number)', () => {
    const expectedInvoice: Invoice = { id: 1, referenceNumber: '123456', createdTime: new Date(), items: [] };

    service.getInvoiceByReferenceNumber('123456').subscribe(
      invoice => expect(invoice).toEqual(expectedInvoice, 'should return expected invoice'),
      fail
    );

    const req = httpTestingController.expectOne(`${service.invoicesUrl}/search/123456`);
    expect(req.request.method).toEqual('GET');

    // Respond with the mock invoice
    req.flush(expectedInvoice);
  });

  it('should turn 404 into an undefined invoice result with 3 retries (by reference number)', () => {

    service.getInvoiceByReferenceNumber('123456').subscribe(
      invoice => expect(invoice).toEqual(Object({}), 'should return Object({})'),
      fail
    );

    // respond with a 404 and the error message in the body
    const msg = 'deliberate 404 error';
    const retryCount = 3;
    for (var i = 0, c = retryCount + 1; i < c; i++) {
      let req = httpTestingController.expectOne(`${service.invoicesUrl}/search/123456`);
      req.flush(msg, { status: 404, statusText: 'Not Found' });
    }

  });

});
