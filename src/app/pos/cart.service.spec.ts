import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpErrorHandler } from '../http-error-handler/http-error-handler.service';
import { ServiceResult } from '../models/service-result.interface';
import { Product } from '../products/product.interface';
import { CartItem } from './cart-item.interface';
import { CartService } from './cart.service';


describe('CartService', () => {
  let httpTestingController: HttpTestingController;
  let service: CartService;
  let expectedItems: CartItem[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [HttpClientTestingModule],
      // Provide the service-under-test and its dependencies
      providers: [CartService, HttpErrorHandler]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CartService);

    expectedItems = [
      new CartItem({ id: 1, name: 'A', upc: '1001', cost: 1, price: 1, quantity: 1 }, 1),
      new CartItem({ id: 2, name: 'B', upc: '1002', cost: 2, price: 2, quantity: 2 }, 2)
    ];

  });

  it('should return expected items in reverse', () => {

    service.addItem(expectedItems[0].product);
    service.addItem(expectedItems[1].product);
    service.addItem(expectedItems[1].product);

    expect(service.items).toEqual(expectedItems.reverse(), 'should return expected items in reverse');
  });

  it('should return total cost of the items', () => {

    service.addItem(expectedItems[0].product);
    service.addItem(expectedItems[1].product);
    service.addItem(expectedItems[1].product);

    expect(service.total).toEqual(5, 'should return 5 as total');
  });

  it('should add item to cart', () => {

    service.addItem(expectedItems[0].product);

    expect(service.items.length).toEqual(1, 'should return 1 item');
    expect(service.items[0].product.name).toEqual('A', 'should return product "A"');
    expect(service.items[0].quantity).toEqual(1, 'should return 1 quantity');
  });

  it('should remove item from cart', () => {

    service.addItem(expectedItems[0].product);
    service.addItem(expectedItems[1].product);
    service.addItem(expectedItems[1].product);

    service.removeItem(expectedItems[0].product);

    expect(service.items.length).toEqual(1, 'should return 1 item');
    expect(service.items[0].product.name).toEqual('B', 'should return product "B"');
    expect(service.items[0].quantity).toEqual(2, 'should return 2 quantity');
  });

  it('should reset or void cart', () => {

    service.addItem(expectedItems[0].product);
    service.addItem(expectedItems[1].product);
    service.addItem(expectedItems[1].product);

    service.resetCart();

    expect(service.items.length).toEqual(0, 'should return empty cart');
  });

  it('should checkout the cart and return a ServiceResult', () => {
    const product: Product = { id: 0, name: 'A', upc: '1001', cost: 1, price: 1, quantity: 10 };

    service.addItem(product);

    service.checkout().subscribe(
      serviceResult => expect(serviceResult.success).toEqual(true, 'should return successful'),
      fail
    );

    // CartService should have made one request to POST product
    const req = httpTestingController.expectOne(service.checkoutUrl);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(service.items.map(item => ({ productId: item.product.id, quantity: item.quantity })));

    // Expect server to return the ServiceResult after POST
    const expectedResponse = new HttpResponse({
      status: 200, statusText: 'OK', body: { success: true } as ServiceResult
    });
    req.event(expectedResponse);
  });

});
