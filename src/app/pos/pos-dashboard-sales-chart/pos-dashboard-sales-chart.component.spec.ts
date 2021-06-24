import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HttpErrorHandler } from '../../http-error-handler/http-error-handler.service';

import { PosDashboardSalesChartComponent } from './pos-dashboard-sales-chart.component';

describe('PosDashboardSalesChartComponent', () => {
  let component: PosDashboardSalesChartComponent;
  let fixture: ComponentFixture<PosDashboardSalesChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PosDashboardSalesChartComponent],
      imports: [NoopAnimationsModule, NgxChartsModule, HttpClientTestingModule],
      providers: [HttpErrorHandler]
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
