import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PosDashboardSalesChartComponent } from '../pos-dashboard-sales-chart/pos-dashboard-sales-chart.component';
import { PosDashboardSalesFigureComponent } from '../pos-dashboard-sales-figure/pos-dashboard-sales-figure.component';

import { PosDashboardComponent } from './pos-dashboard.component';

describe('PosDashboardComponent', () => {
  let component: PosDashboardComponent;
  let fixture: ComponentFixture<PosDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PosDashboardComponent, PosDashboardSalesChartComponent, PosDashboardSalesFigureComponent],
      imports: [NoopAnimationsModule, NgxChartsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PosDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
