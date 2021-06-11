import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { CanDeactivateGuard } from '../guards/can-deactivate.guard';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          { path: 'form/:id', component: ProductFormComponent, canDeactivate: [CanDeactivateGuard], data: { animation: 'productForm' } },
          { path: 'form', component: ProductFormComponent, canDeactivate: [CanDeactivateGuard], data: { animation: 'productForm' } },
          { path: '', component: ProductListComponent, data: { animation: 'productList' } }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
