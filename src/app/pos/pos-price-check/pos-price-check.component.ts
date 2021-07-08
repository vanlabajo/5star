import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../products/product.interface';
import { ProductService } from '../../products/product.service';
import { ToastService } from '../../toast/toast.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-pos-price-check',
  templateUrl: './pos-price-check.component.html',
  styleUrls: ['./pos-price-check.component.css']
})
export class PosPriceCheckComponent {
  product!: Product;

  constructor(
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private toastService: ToastService
  ) { }

  onScanSuccess(scanResult: string): void {
    if (scanResult) {
      const upc = scanResult.trim();
      if (upc.length > 0) {
        this.productService.getProductByNameOrUpc(upc)
          .subscribe(product => {
            this.product = product;

            if (!this.product) {
              this.toastService.showWarning('Unable to find the product you were looking for. Please check if the barcode is correct.');
            }

          });
      }
    }
  }

  addToCart(): void {
    this.cartService.addItem(this.product);
    this.router.navigateByUrl('/pos/checkout');
  }
}
