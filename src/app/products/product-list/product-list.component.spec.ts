import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorHandler } from '../../http-error-handler/http-error-handler.service';
import { ProductListComponent } from './product-list.component';


describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      imports: [NgbPaginationModule, HttpClientTestingModule, RouterTestingModule],
      providers: [HttpErrorHandler]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    component.pagedResult = {
      data: [],
      collectionSize: 0
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should hide pagination when pagedResult.collectionSize < pagedQuery.pageInfo.pageSize', () => {
    component.pagedResult.collectionSize = 1;
    component.pagedQuery.pageInfo.pageSize = 30;
    fixture.detectChanges();
    const nativeElement: HTMLElement = fixture.nativeElement;
    const pagination = nativeElement.querySelector('ngb-pagination')!;
    expect(pagination).toBeNull();
  });

  it('should show pagination when pagedResult.collectionSize > pagedQuery.pageInfo.pageSize', () => {    
    component.pagedResult.collectionSize = 31;
    component.pagedQuery.pageInfo.pageSize = 30;
    fixture.detectChanges();
    const nativeElement: HTMLElement = fixture.nativeElement;
    const pagination = nativeElement.querySelector('ngb-pagination')!;    
    expect(pagination).not.toBeNull();
  });

  it('should display no records found when product data is empty', () => {
    component.pagedResult.data = [];
    fixture.detectChanges();
    const nativeElement: HTMLElement = fixture.nativeElement;
    const td = nativeElement.querySelector('td')!;
    expect(td.textContent).toEqual('No records found');
  });

  it('should not display no records found when product data exists', () => {
    component.pagedResult.data = [{ id: 1, name: 'coffee', upc: '10001', price: 0, cost: 0, quantity: 10, auditLog: null }];
    fixture.detectChanges();
    const nativeElement: HTMLElement = fixture.nativeElement;
    const td = nativeElement.querySelector('td')!;
    expect(td.textContent).not.toEqual('No records found');
  });
});
