import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products/products.component';
import { ProductListComponent } from './product-list/product-list.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductFormComponent } from './product-form/product-form.component';
import { FormsModule } from '@angular/forms';
import { BarcodeScannerModule } from '../barcode-scanner/barcode-scanner.module';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductListComponent,
    ProductFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbPaginationModule,
    BarcodeScannerModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
