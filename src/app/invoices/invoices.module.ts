import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoicesComponent } from './invoices/invoices.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';


@NgModule({
  declarations: [
    InvoicesComponent,
    InvoiceListComponent,
    InvoiceDetailComponent
  ],
  imports: [
    CommonModule,
    NgbPaginationModule,
    InvoicesRoutingModule
  ]
})
export class InvoicesModule { }
