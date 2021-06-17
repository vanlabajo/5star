import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpErrorHandler } from '../../http-error-handler/http-error-handler.service';
import { ProductService } from '../../products/product.service';
import { ToastService } from '../../toast/toast.service';
import { CartService } from '../cart.service';

import { PosCheckoutComponent } from './pos-checkout.component';

describe('PosCheckoutComponent', () => {
  let component: PosCheckoutComponent;
  let fixture: ComponentFixture<PosCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule],
      declarations: [PosCheckoutComponent],
      providers: [CartService, ProductService, HttpErrorHandler, ToastService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PosCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
