import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from '../../dialog/dialog.service';
import { Product } from '../../products/product.interface';
import { ProductService } from '../../products/product.service';
import { SpinnerService } from '../../spinner/spinner.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-pos-price-check',
  templateUrl: './pos-price-check.component.html',
  styleUrls: ['./pos-price-check.component.css']
})
export class PosPriceCheckComponent implements OnInit {
  product!: Product;

  constructor(
    private router: Router,
    private dialog: DialogService,
    private productService: ProductService,
    private cartService: CartService,
    public spinnerService: SpinnerService
  ) { }

  ngOnInit(): void {
    this.dialog.scanBarcode$()
      .subscribe(result => {
        if (result) {
          const upc = result.trim();
          if (upc.length > 0) {
            this.productService.getProductByNameOrUpc(upc)
              .subscribe(product => this.product = product);
          }
        }
      });
  }

  search(term: string): void {
    if (term) {
      this.productService.getProductByNameOrUpc(term)
        .subscribe(product => this.product = product);
    }    
  }

  addToCart(): void {
    this.cartService.addItem(this.product);
    this.router.navigateByUrl('/pos/checkout');
  }
}
