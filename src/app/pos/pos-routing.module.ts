import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { PosDashboardComponent } from './pos-dashboard/pos-dashboard.component';
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
          { path: '', component: PosDashboardComponent }
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
