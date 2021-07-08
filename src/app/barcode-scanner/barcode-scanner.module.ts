import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OneDimentionalScannerComponent } from './one-dimentional-scanner/one-dimentional-scanner.component';



@NgModule({
  declarations: [
    OneDimentionalScannerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    OneDimentionalScannerComponent
  ]
})
export class BarcodeScannerModule { }
