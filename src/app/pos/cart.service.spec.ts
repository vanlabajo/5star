import { TestBed } from '@angular/core/testing';
import { CartItem } from './cart-item.interface';
import { CartService } from './cart.service';


describe('CartService', () => {
  let service: CartService;
  let expectedItems: CartItem[];

  beforeEach(() => {
    TestBed.configureTestingModule({});
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

});
