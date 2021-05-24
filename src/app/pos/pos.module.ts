import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PosRoutingModule } from './pos-routing.module';
import { PosComponent } from './pos/pos.component';
import { PosDashboardComponent } from './pos-dashboard/pos-dashboard.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PosDashboardSalesChartComponent } from './pos-dashboard-sales-chart/pos-dashboard-sales-chart.component';
import { PosDashboardSalesFigureComponent } from './pos-dashboard-sales-figure/pos-dashboard-sales-figure.component';
import { PosDashboardProductComponent } from './pos-dashboard-product/pos-dashboard-product.component';


@NgModule({
  declarations: [
    PosComponent,
    PosDashboardComponent,
    PosDashboardSalesChartComponent,
    PosDashboardSalesFigureComponent,
    PosDashboardProductComponent
  ],
  imports: [
    CommonModule,
    NgxChartsModule,
    NgbCarouselModule,
    PosRoutingModule
  ]
})
export class PosModule { }
