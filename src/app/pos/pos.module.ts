import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PosRoutingModule } from './pos-routing.module';
import { PosComponent } from './pos/pos.component';
import { PosDashboardComponent } from './pos-dashboard/pos-dashboard.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PosDashboardSalesChartComponent } from './pos-dashboard-sales-chart/pos-dashboard-sales-chart.component';
import { PosDashboardSalesFigureComponent } from './pos-dashboard-sales-figure/pos-dashboard-sales-figure.component';
import { PosCheckoutComponent } from './pos-checkout/pos-checkout.component';
import { PosPriceCheckComponent } from './pos-price-check/pos-price-check.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PosComponent,
    PosDashboardComponent,
    PosDashboardSalesChartComponent,
    PosDashboardSalesFigureComponent,
    PosCheckoutComponent,
    PosPriceCheckComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxChartsModule,
    NgbCarouselModule,
    PosRoutingModule
  ]
})
export class PosModule { }
