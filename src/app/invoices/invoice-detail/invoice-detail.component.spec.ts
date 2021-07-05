import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpErrorHandler } from '../../http-error-handler/http-error-handler.service';
import { InvoiceListComponent } from '../invoice-list/invoice-list.component';
import { InvoiceService } from '../invoice.service';

import { InvoiceDetailComponent } from './invoice-detail.component';

describe('InvoiceDetailComponent', () => {
  let component: InvoiceDetailComponent;
  let fixture: ComponentFixture<InvoiceDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvoiceDetailComponent],
      imports: [
        RouterTestingModule.withRoutes(
          [{ path: 'invoices', component: InvoiceListComponent }]
        ),
        HttpClientTestingModule],
      providers: [InvoiceService, HttpErrorHandler]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
