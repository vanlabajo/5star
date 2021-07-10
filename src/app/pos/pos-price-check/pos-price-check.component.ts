import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../products/product.interface';
import { ProductService } from '../../products/product.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-pos-price-check',
  templateUrl: './pos-price-check.component.html',
  styleUrls: ['./pos-price-check.component.css']
})
export class PosPriceCheckComponent {
  product!: Product;
  openScanner: boolean = true;
  searching: boolean = false;
  scannedUpc: string;

  constructor(
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) { }

  onScanSuccess(scanResult: string): void {
    if (scanResult) {
      this.scannedUpc = scanResult.trim();
      if (this.scannedUpc.length > 0) {
        this.openScanner = false;
        this.searching = true;

        this.productService.getProductByNameOrUpc(this.scannedUpc)
          .subscribe(product => {
            this.product = product;
            this.searching = false;
          });
      }
    }
  }

  addToCart(): void {
    this.cartService.addItem(this.product);
    this.router.navigateByUrl('/pos/checkout');
  }
}
