import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { PosCheckoutComponent } from './pos-checkout/pos-checkout.component';
import { PosDashboardComponent } from './pos-dashboard/pos-dashboard.component';
import { PosPriceCheckComponent } from './pos-price-check/pos-price-check.component';
import { PosComponent } from './pos/pos.component';

const routes: Routes = [
  {
    path: 'pos',
    component: PosComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          { path: 'checkout', component: PosCheckoutComponent, data: { animation: 'posCheckout' } },
          { path: 'price-check', component: PosPriceCheckComponent, data: { animation: 'posPriceCheck' } },
          { path: '', component: PosDashboardComponent, data: { animation: 'posDashboard' } }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PosRoutingModule { }
