import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpErrorHandler } from '../../http-error-handler/http-error-handler.service';
import { ProductService } from '../../products/product.service';
import { CartService } from '../cart.service';

import { PosPriceCheckComponent } from './pos-price-check.component';

describe('PosPriceCheckComponent', () => {
  let component: PosPriceCheckComponent;
  let fixture: ComponentFixture<PosPriceCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule],
      providers: [ProductService, HttpErrorHandler, CartService],
      declarations: [ PosPriceCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PosPriceCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
