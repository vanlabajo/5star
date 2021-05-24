import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosDashboardSalesFigureComponent } from './pos-dashboard-sales-figure.component';

describe('PosDashboardSalesFigureComponent', () => {
  let component: PosDashboardSalesFigureComponent;
  let fixture: ComponentFixture<PosDashboardSalesFigureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosDashboardSalesFigureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PosDashboardSalesFigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
