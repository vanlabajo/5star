import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosDashboardSalesChartComponent } from './pos-dashboard-sales-chart.component';

describe('PosDashboardSalesChartComponent', () => {
  let component: PosDashboardSalesChartComponent;
  let fixture: ComponentFixture<PosDashboardSalesChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosDashboardSalesChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PosDashboardSalesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
