import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosDashboardProductComponent } from './pos-dashboard-product.component';

describe('PosDashboardProductComponent', () => {
  let component: PosDashboardProductComponent;
  let fixture: ComponentFixture<PosDashboardProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosDashboardProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PosDashboardProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
