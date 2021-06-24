import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoicesComponent } from './invoices/invoices.component';

const routes: Routes = [
  {
    path: 'invoices',
    component: InvoicesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          { path: 'detail/:id', component: InvoiceDetailComponent, data: { animation: 'invoiceDetail' } },
          { path: '', component: InvoiceListComponent, data: { animation: 'invoiceList' } }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicesRoutingModule { }
