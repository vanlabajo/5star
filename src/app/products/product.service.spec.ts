import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpErrorHandler } from '../http-error-handler/http-error-handler.service';
import { PagedQuery } from '../models/paged-query.interface';
import { PagedResult } from '../models/paged-result.interface';
import { ServiceResult } from '../models/service-result.interface';
import { Product } from './product.interface';
import { ProductService } from './product.service';


describe('ProductService', () => {
  let httpTestingController: HttpTestingController;
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [HttpClientTestingModule],
      // Provide the service-under-test and its dependencies
      providers: [ProductService, HttpErrorHandler]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ProductService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  describe('#getProducts', () => {
    let pagedQuery: PagedQuery;
    let pagedResult: PagedResult<Product>;
    let expectedProducts: Product[];

    beforeEach(() => {
      service = TestBed.inject(ProductService);
      pagedQuery = {
        searchTerm: '',
        pageInfo: {
          page: 1,
          pageSize: 30
        }
      };
      expectedProducts = [
        { id: 1, name: 'A', cost: 1, price: 1 },
        { id: 2, name: 'B', cost: 2, price: 2 },
      ] as Product[];
      pagedResult = {
        data: expectedProducts,
        collectionSize: expectedProducts.length
      };
    });

    it('should return expected products (called once)', () => {

      service.getProducts(pagedQuery).subscribe(
        result => expect(result.data).toEqual(expectedProducts, 'should return expected products'),
        fail
      );

      // ProductService should have made one request to GET products from expected URL
      const req = httpTestingController.expectOne(service.productsUrl + '?searchTerm=&pageInfo.page=1&pageInfo.pageSize=30');
      expect(req.request.method).toEqual('GET');

      // Respond with the mock products
      req.flush(pagedResult);
    });

    it('should be OK returning no products', () => {

      service.getProducts(pagedQuery).subscribe(
        result => expect(result.data.length).toEqual(0, 'should have empty products array'),
        fail
      );

      const req = httpTestingController.expectOne(service.productsUrl + '?searchTerm=&pageInfo.page=1&pageInfo.pageSize=30');
      req.flush({ data: [] } as PagedResult<Product>); // Respond with no products
    });

    // This service reports the error but finds a way to let the app keep going.
    it('should turn 404 into an empty products result with 3 retries', () => {

      service.getProducts(pagedQuery).subscribe(
        result => expect(result.data.length).toEqual(0, 'should return empty products array'),
        fail
      );

      // respond with a 404 and the error message in the body
      const msg = 'deliberate 404 error';
      const retryCount = 3;
      for (var i = 0, c = retryCount + 1; i < c; i++) {
        let req = httpTestingController.expectOne(service.productsUrl + '?searchTerm=&pageInfo.page=1&pageInfo.pageSize=30');
        req.flush(msg, { status: 404, statusText: 'Not Found' });
      }
      
    });

    it('should return expected products (called multiple times)', () => {

      service.getProducts(pagedQuery).subscribe();
      service.getProducts(pagedQuery).subscribe();
      service.getProducts(pagedQuery).subscribe(
        result => expect(result.data).toEqual(expectedProducts, 'should return expected products'),
        fail
      );

      const requests = httpTestingController.match(service.productsUrl + '?searchTerm=&pageInfo.page=1&pageInfo.pageSize=30');
      expect(requests.length).toEqual(3, 'calls to getProducts()');

      // Respond to each request with different mock product results
      requests[0].flush({ data: [] } as PagedResult<Product>);
      requests[1].flush({ data: [{ id: 1, name: 'coffee', price: 0, cost: 0 }] } as PagedResult<Product>);
      requests[2].flush({ data: expectedProducts } as PagedResult<Product>);
    });
  });

  describe('#getProduct', () => {
    let expectedProduct: Product;

    beforeEach(() => {
      service = TestBed.inject(ProductService);
      expectedProduct = { id: 1, name: 'A', cost: 1, price: 1 } as Product;
    });

    it('should return expected product (called once)', () => {

      service.getProduct(1).subscribe(
        product => expect(product).toEqual(product, 'should return expected product'),
        fail
      );

      // ProductService should have made one request to GET product from expected URL
      const req = httpTestingController.expectOne(`${service.productsUrl}/${1}`);
      expect(req.request.method).toEqual('GET');

      // Respond with the mock products
      req.flush(expectedProduct);
    });

    // This service reports the error but finds a way to let the app keep going.
    it('should turn 404 into an undefined product result with 3 retries', () => {

      service.getProduct(1).subscribe(
        product => expect(product).toEqual(Object({}), 'should return Object({})'),
        fail
      );

      // respond with a 404 and the error message in the body
      const msg = 'deliberate 404 error';
      const retryCount = 3;
      for (var i = 0, c = retryCount + 1; i < c; i++) {
        let req = httpTestingController.expectOne(`${service.productsUrl}/${1}`);
        req.flush(msg, { status: 404, statusText: 'Not Found' });
      }

    });
  });

  describe('#addProduct', () => {

    it('should add a product and return it', () => {
      const addProduct: Product = { id: 0, name: 'A', upc: '1001', cost: 1, price: 1, quantity: 10 };

      service.addProduct(addProduct).subscribe(
        serviceResult => expect(serviceResult.success).toEqual(true, 'should return successful'),
        fail
      );

      // ProductService should have made one request to POST product
      const req = httpTestingController.expectOne(service.productsUrl);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(addProduct);

      // Expect server to return the product after POST
      const expectedResponse = new HttpResponse({
        status: 200, statusText: 'OK', body: { success: true } as ServiceResult
      });
      req.event(expectedResponse);
    });

    // This service reports the error but finds a way to let the app keep going.
    it('should turn 403 error into expected ServiceResult', () => {
      const addProduct: Product = { id: 0, name: 'A', upc: '1001', cost: 1, price: 1, quantity: 10 };

      service.addProduct(addProduct).subscribe(
        serviceResult => expect(serviceResult.success).toEqual(false, 'should return unsuccessful'),
        fail
      );

      const req = httpTestingController.expectOne(service.productsUrl);

      // respond with a 403 and the error message in the body
      const msg = 'deliberate 403 error';
      req.flush(msg, { status: 404, statusText: 'Forbidden' });
    });
  });

  describe('#updateProduct', () => {

    it('should update a product and return it', () => {
      const updateProduct: Product = { id: 1, name: 'A', upc: '1001', cost: 1, price: 1, quantity: 10 };

      service.updateProduct(updateProduct).subscribe(
        serviceResult => expect(serviceResult.success).toEqual(true, 'should return successful'),
        fail
      );

      // ProductService should have made one request to PUT hero
      const req = httpTestingController.expectOne(`${service.productsUrl}/${1}`);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(updateProduct);

      // Expect server to return the hero after PUT
      const expectedResponse = new HttpResponse({
        status: 200, statusText: 'OK', body: { success: true } as ServiceResult
      });
      req.event(expectedResponse);
    });

    // This service reports the error but finds a way to let the app keep going.
    it('should turn 404 error into expected ServiceResult', () => {
      const updateProduct: Product = { id: 1, name: 'A', upc: '1001', cost: 1, price: 1, quantity: 10 };

      service.updateProduct(updateProduct).subscribe(
        serviceResult => expect(serviceResult.success).toEqual(false, 'should return unsuccessful'),
        fail
      );

      const req = httpTestingController.expectOne(`${service.productsUrl}/${1}`);

      // respond with a 404 and the error message in the body
      const msg = 'deliberate 404 error';
      req.flush(msg, { status: 404, statusText: 'Not Found' });
    });
  });

});
