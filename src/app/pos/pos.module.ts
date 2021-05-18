import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PosRoutingModule } from './pos-routing.module';
import { PosComponent } from './pos/pos.component';
import { PosDashboardComponent } from './pos-dashboard/pos-dashboard.component';


@NgModule({
  declarations: [
    PosComponent,
    PosDashboardComponent
  ],
  imports: [
    CommonModule,
    PosRoutingModule
  ]
})
export class PosModule { }
